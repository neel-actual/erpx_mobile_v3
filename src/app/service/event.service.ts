import { Injectable } from '@angular/core';
import {ConfigService} from "./config.service";
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  listing: any = [];

  constructor(
      private config: ConfigService,
      private http: HttpService
  ) { }

  getListing(refresh = false) {
    if (this.listing.length === 0 || refresh) {
      return this.http.get(this.config.get_api_url('/api/method/erpx_prulia.prulia_events.doctype.prulia_event.prulia_event.get_event_list')).then(res => {

        if (res['message'] instanceof Array) {
          this.listing = res['message'];
        }

        for (let event of this.listing) {
          if (!event['event_image'] || event['event_image'] === null) {
            event['event_image'] = "../www/assets/images/Prulia-word-logo.png"
          } else if (!event['event_image'].startsWith("http")) {
            event['event_image'] = this.config.get_service_endpoint(true) + event['event_image']
          }
          event['start_date_time'] = new Date(event['start_date_time'].replace(' ', 'T') + '+08:00')
          event['end_date_time'] = new Date(event['end_date_time'].replace(' ', 'T') + '+08:00')
        }

        return this.listing;
      });
    }
    else {
      return Promise.resolve(this.listing);
    }
  }

  updateRegistration () {}
}
