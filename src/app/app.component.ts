import { Component } from '@angular/core';

import { Platform, LoadingController } from '@ionic/angular';
import {StatusBar} from "@ionic-native/status-bar/ngx";
import {SplashScreen} from "@ionic-native/splash-screen/ngx";

import {ConfigService} from './service/config.service';
import {AuthService} from './service/auth.service';
import {Router, ActivatedRoute} from '@angular/router';

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
    private route: ActivatedRoute,
    private loadingController: LoadingController
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.platform.ready();
    this.statusBar.overlaysWebView(false);
    this.statusBar.backgroundColorByHexString('#F1646B');
    this.splashScreen.hide();

    let loading = await this.loadingController.create({});

    await loading.present();

    this.auth.isLoggedIn().then(() => {
      // this.router.navigate([''])
    }).catch(() => {
      this.router.navigate(['/login']);
    }).finally(() => {
      loading.dismiss();
    })
  }
}
