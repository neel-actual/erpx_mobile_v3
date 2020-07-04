import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import {Router} from '@angular/router';
import {AlertController} from "@ionic/angular";
import {EventBus} from "../../event-bus.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  constructor(
      private auth: AuthService,
      private router: Router,
      private alert: AlertController,
      private events: EventBus
  ) { }

  ngOnInit() {}

  login(form) {
    let { username, password } = form.value;

    return this.auth.login(username, password).then(data => {
      form.reset();
      this.events.publish('login', '');
    }).catch((e) => {
      let msg = e && e.error && e.error.message;

      if (msg) {
        this.presentAlert('Error!', msg);
      }
    });
  }

  async presentAlert(title, message) {
    let alert = await this.alert.create({
      header: title,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

}
