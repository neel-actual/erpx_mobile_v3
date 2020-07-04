import { Component } from '@angular/core';

import { Platform, LoadingController } from '@ionic/angular';
import {StatusBar} from "@ionic-native/status-bar/ngx";
import {SplashScreen} from "@ionic-native/splash-screen/ngx";

import {ConfigService} from './service/config.service';
import {AuthService} from './service/auth.service';
import {Router, ActivatedRoute} from '@angular/router';

import {EventBus} from "./event-bus.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  loader: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private config: ConfigService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private events: EventBus
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.platform.ready();
    this.statusBar.overlaysWebView(false);
    this.statusBar.backgroundColorByHexString('#F1646B');
    this.splashScreen.hide();

    this.events.subscribe('loading:start', (content = '') => this.presentLoading(content));
    this.events.subscribe('loading:end', () => this.dismissLoading());

    this.presentLoading();
    this.auth.isLoggedIn().then(() => {
      // this.router.navigate([''])
    }).catch(() => {
      this.router.navigate(['/login']);
    }).finally(() => {
      this.dismissLoading()
    })
  }

  async presentLoading(message = '') {
    this.loader = await this.loadingController.create({
      message: message,
    });
    await this.loader.present();
  }

  async dismissLoading() {
    if (this.loader) {
      await this.loader.dismiss();
    }
    else {
      setTimeout(() => {
        this.loader.dismiss();
      }, 500);
    }
  }
}
