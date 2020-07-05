import { Component } from '@angular/core';

import { Platform, LoadingController, ToastController } from '@ionic/angular';
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
  private loader: HTMLIonLoadingElement;
  private loaderLoading = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private config: ConfigService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private events: EventBus
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.platform.ready();
    this.statusBar.overlaysWebView(false);
    this.statusBar.backgroundColorByHexString('#F1646B');
    this.splashScreen.hide();

    this.events.subscribe('loading:start', (message = '') => this.presentLoading(message));
    this.events.subscribe('loading:end', () => this.dismissLoading());
    this.events.subscribe('toast', (opts) => this.presentToast(opts))
    this.events.subscribe('login', () => this.loginUser());
    this.events.subscribe('logout', () => this.logoutUser());

    this.presentLoading();
    this.auth.isLoggedIn().then(() => {
      // this.router.navigate([''])
    }).catch(() => {
      this.router.navigate(['login'])
    }).finally(() => {
      this.dismissLoading()
    })
  }

  loginUser() {
    this.router.navigate([''])
  }

  logoutUser() {
    this.router.navigate(['login'])
  }

  async presentToast(opts: {
    message: string,
    duration: number,
    color: string
  }) {
    console.log(opts);
    if (opts.message) {
      opts.color = opts.color || 'success';
      opts.duration = opts.duration || 2000;
      const toast = await this.toastController.create({
        message: opts.message,
        duration: opts.duration,
        color: opts.color
      });
      await toast.present();
    }
  }

  async presentLoading(message = '') {
    this.loaderLoading = true;
    this.loadingController.create({
      message,
    }).then(load => {
      this.loader = load;
      load.present().then(() => { this.loaderLoading = false; });
    });
  }

  async dismissLoading() {
    const interval = setInterval(() => {
      if (this.loader || !this.loaderLoading) {
        this.loader.dismiss().then(() => { this.loader = null; clearInterval(interval)});
      } else if (!this.loader && !this.loaderLoading) {
        clearInterval(interval);
      }
    }, 500);
  }
}
