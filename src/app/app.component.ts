import { Component } from '@angular/core';

import {Platform, LoadingController, ToastController, ModalController} from '@ionic/angular';
import {StatusBar} from "@ionic-native/status-bar/ngx";
import {SplashScreen} from "@ionic-native/splash-screen/ngx";

import {ConfigService} from './service/config.service';
import {AuthService} from './service/auth.service';
import {Router, ActivatedRoute} from '@angular/router';

import {EventBus} from "./event-bus.service";
import {NewsModalPage} from "./news-modal/news-modal.page";
import {MemberService} from "./service/member.service";
import {NewsService} from "./service/news.service";

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
    private events: EventBus,
    private modalController: ModalController,
    private member: MemberService,
    private news: NewsService,
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
    this.events.subscribe('greetings:show', async () => {
      this.getNews().then(async (list) => {
        let greetingModal = await this.modalController.create({
          component: NewsModalPage,
          cssClass: 'news-modal-popup',
          componentProps: {
            list: list
          }
        });
        await greetingModal.present();
      }).catch(e => {})
    });

    await this.presentLoading();
    this.auth.isLoggedIn().then(() => {
      // this.router.navigate([''])
      this.events.publish('greetings:show');
    }).catch(() => {
      this.router.navigate(['login'])
    }).finally(() => {
      this.dismissLoading()
    })
  }

  loginUser() {
    this.router.navigate([''], {
      replaceUrl: true
    });
    this.events.publish('greetings:show');
  }

  logoutUser() {
    this.router.navigate(['login'], {
      replaceUrl: true
    })
  }

  async presentToast(opts: {
    message: string,
    duration: number,
    color: string
  }) {
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

  getNews() {
    return this.member.getProfile().then(memberProfile => {
      console.log(memberProfile);
      return this.news.getPopup().then(list => {
        let images = [];

        list = list.filter(news => {
          let filters = ['position', 'region', 'branch'],
              ret = true;

          filters.forEach(filter => {
            if (ret && news[filter].length && news[filter].map(el => { return el.name; }).indexOf(memberProfile[filter]) === -1) { ret = false; }
          });

          return ret;
        });

        if (list.length) {
          list.forEach(news => {
            images.push(this.config.get_service_endpoint(true) + news['news_image']);
          })
          return images;
        }
        else { return Promise.reject(); }
      })
    });
  }
}
