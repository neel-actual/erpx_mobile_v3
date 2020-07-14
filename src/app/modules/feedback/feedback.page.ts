import { Component, OnInit } from '@angular/core';
import {FeedbackService} from "../../service/feedback.service";
import {AlertController, ToastController} from "@ionic/angular";
import {EventBus} from "../../event-bus.service";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  categories: any = [];
  category: string;
  remark: string;
  errors: string[] = [];

  constructor(
      private feedback: FeedbackService,
      private alertCtrl: AlertController,
      private toastCtrl: ToastController,
      private events: EventBus
  ) { }

  ngOnInit() {
    this.feedback.get_categories().then(cats => {
      this.categories = cats;
    });
  }

  async submitFeedback() {
    this.errors = [];

    if (!this.category) {
      this.errors.push('Category is required');
    }

    if (!this.remark) {
      this.errors.push('Remark is required');
    }

    if (this.errors.length) {
      let alert = await this.alertCtrl.create({
        header: 'Error',
        message: '<ul>' + this.errors.map(err => {
          return '<li>' + err + '</li>';
        }).join('') + '</ul>',
        buttons: [{
          text: 'OK',
          role: 'cancel',
          cssClass: 'secondary'
        }]
      });

      await alert.present();
    }
    else {
      this.events.publish('loading:start', 'Submitting...');
      this.feedback.submit_feedback(this.category, this.remark).then(async (res) => {
        let msg;

        if (res && res['message']) {
          msg = "Your feedback has been submitted";
          this.category = '';
          this.remark = '';
        }
        else {
          msg = "Something's wrong. Please try again";
        }

        let toast = await this.toastCtrl.create({
          message: msg,
          duration: 3000
        });

        await toast.present();

        this.events.publish('loading:end');
      });
    }
  }

}
