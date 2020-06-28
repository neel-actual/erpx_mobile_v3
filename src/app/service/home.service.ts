import { Injectable } from '@angular/core';
import {ConfigService} from './config.service';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  listing: any = [];

  constructor(
      private config: ConfigService,
      private http: HttpService
  ) { }

  getListing(refresh = false) {
    if (this.listing.length === 0 || refresh) {
      return this.http.get(this.config.get_api_url('/api/method/erpx_prulia.prulia_news.doctype.prulia_home.prulia_home.get_home')).then(res => {

        if (res['message']['content'] instanceof Array) {
          this.listing = res['message']['content'];
        }

        for (let home of this.listing) {
          if (!home['image'] || home['image'] === null) {
            home['image'] = "../www/assets/images/Prulia-word-logo.png"
          } else if (!home['image'].startsWith("http")) {
            home['image'] = this.config.get_service_endpoint(true) + home['image']
          }
        }

        return this.listing;
      });
    }
    else {
      return Promise.resolve(this.listing);
    }
  }

  getItem(name) {
    return this.getListing().then(listing => {
      let res = null;

      listing.forEach(item => {
        if (item.name === name) { res = item; }
      });

      return res;
    });
  }
}
