import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import {Router} from '@angular/router';
import {AlertController} from "@ionic/angular";
import {EventBus} from "../../event-bus.service";
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {ConfigService} from "../../service/config.service";

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
      private iab: InAppBrowser,
      private config: ConfigService
  ) {

  }

  ngOnInit() {
    this.getAppVersion();
  }

  async getAppVersion() {
    this.app_version = await this.auth.getAppVersion();
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

  register() {
    const browser = this.iab.create(this.config.get_api_url('/member-registration'), '_blank',
        'location=no');

    browser.on("loadstop")
        .subscribe(
            (evt) => {
              if (evt.url.match("registration-complete")) {
                browser.close();
              }
            },
            err => {
              console.log("InAppBrowser loadstop Event Error: " + err);
            });
  }

}
