import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import {ConfigService} from './service/config.service';
import {AuthService} from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private config: ConfigService,
    private auth: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.auth.set_sid_cookie();
      this.auth.if_session_valid().then(data => {
        console.log(data)
      }).catch(e => {
        this.auth.login('0123456', '12345').then(data => {
          console.log(data);
        }).catch(e => {
          console.error(e);
        })
      })
    });
  }
}
