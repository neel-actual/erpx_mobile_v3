import { Injectable } from '@angular/core';
import {ConfigService} from "./config.service";
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  listing: any = [];

  constructor(
      private config: ConfigService,
      private http: HttpService
  ) { }

  getListing(refresh = false) {
    if (this.listing.length === 0 || refresh) {
      return this.http.get(this.config.get_api_url('/api/method/erpx_prulia.prulia_news.doctype.prulia_newsletter.prulia_newsletter.get_newsletter_list')).then(res => {

        if (res['message'] instanceof Array) {
          this.listing = res['message'];
        }

        for (let news of this.listing) {
          if (!news['news_image'] || news['news_image'] === null) {
            news['news_image'] = "../www/assets/images/Prulia-word-logo.png"
          } else if (!news['news_image'].startsWith("http")) {
            news['news_image'] = this.config.get_service_endpoint(true) + news['news_image']
          }

          news['publish_date'] = new Date(news['publish_date'] + 'T00:00:00+08:00')
        }

        return this.listing;
      });
    }
    else {
      return Promise.resolve(this.listing);
    }
  }
}
