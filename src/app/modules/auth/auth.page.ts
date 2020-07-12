import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import {Router} from '@angular/router';
import {AlertController} from "@ionic/angular";
import {EventBus} from "../../event-bus.service";

declare let window: any;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  app_version: string = '3.0.6';

  constructor(
      private auth: AuthService,
      private router: Router,
      private alert: AlertController,
      private events: EventBus,
  ) {

  }

  ngOnInit() {}

  async getAppVersion() {
    window.cordova && window.cordova.getAppVersion.getVersionNumber(version => {
      console.log(version);
      this.app_version = version;
    });
  }

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
