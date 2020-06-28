import { Component } from '@angular/core';

import { Platform, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import {ConfigService} from './service/config.service';
import {AuthService} from './service/auth.service';
import {Router} from '@angular/router';

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
    private auth: AuthService,
    private router: Router,
    private loadingController: LoadingController
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.platform.ready();
    this.statusBar.styleDefault();
    this.splashScreen.hide();

    let loading = await this.loadingController.create({});

    await loading.present();

    this.auth.isLoggedIn().then(() => {
      this.router.navigate([''])
    }).catch(() => {
      this.router.navigate(['/login']);
    }).finally(() => {
      loading.dismiss();
    })
  }
}
