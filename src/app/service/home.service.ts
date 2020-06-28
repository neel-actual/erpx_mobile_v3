import { Injectable } from '@angular/core';
import {ConfigService} from './config.service';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
      private config: ConfigService,
      private http: HttpService
  ) { }

  loadListing() {
    // tslint:disable-next-line:max-line-length
    return this.http.get(this.config.get_api_url('/api/method/erpx_prulia.prulia_news.doctype.prulia_home.prulia_home.get_home')).then(res => {
      let data = [];

      if (res['message']['content'] instanceof Array) {
        data = res['message']['content'];
      }

      for (let home of data) {
        if (!home['image'] || home['image'] === null) {
          home['image'] = "../www/assets/images/Prulia-word-logo.png"
        } else if (!home['image'].startsWith("http")) {
          home['image'] = this.config.get_service_endpoint(true) + home['image']
        }
      }

      return data;
    });
  }
}
