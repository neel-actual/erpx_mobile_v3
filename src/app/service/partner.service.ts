import { Injectable } from '@angular/core';
import {ConfigService} from "./config.service";
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class PartnerService {
  listing: any = [];

  constructor(
      private config: ConfigService,
      private http: HttpService
  ) { }

  getListing(refresh = false) {
    if (this.listing.length === 0 || refresh) {
      return this.http.get(this.config.get_api_url('/api/method/erpx_prulia.prulia_news.doctype.prulia_banner.prulia_banner.get_banner')).then(res => {
        if (res['message'] instanceof Array) {
          this.listing = res['message'];
        }

        for (let partner of this.listing) {
          if (!partner['image'] || partner['image'] === null) {
            partner['image'] = "assets/images/Prulia-word-logo.png"
          } else if (!partner['image'].startsWith("http")) {
            partner['image'] = this.config.get_service_endpoint(true) + partner['image']
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
