import {Component, Input, OnInit} from '@angular/core';
import {ModalController, AlertController, ToastController} from "@ionic/angular";
import {EventBus} from "../../../event-bus.service";

@Component({
  selector: 'app-modal-register',
  templateUrl: './modal-register.page.html',
  styleUrls: ['./modal-register.page.scss'],
})
export class ModalRegisterPage implements OnInit {
  @Input() event: Object;

  constructor(
      private modal: ModalController,
      private alert: AlertController,
      private toast: ToastController,
      private events: EventBus
  ) { }

  ngOnInit() {
    console.log(this.event);
  }

  dismiss() {
    this.modal.dismiss({});
  }

  async _displayAckError() {
    console.log("No acknowledgement");
    let alert = await this.alert.create({
      header: 'Alert',
      message: 'Please kindly acknowledge the declaration by clicking the checkbox in the form',
      buttons: ['Dismiss']
    });
    this.events.publish('loading:end', '');
    await alert.present();
  }

  async _displayError(error) {
    console.log(error);
    let alert = await this.alert.create({
      header: 'Error',
      message: 'Error in update',
      buttons: ['Dismiss']
    });
    this.events.publish('loading:end', '');
    await alert.present();
  }

  async _createToast(message) {
    let toast = await this.toast.create({
      message: message,
      duration: 10000,
      buttons: [
        {
          text: 'Done',
          role: 'cancel'
        }
      ],
      position: 'bottom'
    });

    await toast.present();
  }
}
