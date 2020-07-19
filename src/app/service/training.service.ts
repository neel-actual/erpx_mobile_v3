import { Injectable } from '@angular/core';
import {ConfigService} from "./config.service";
import {HttpService} from "./http.service";
import {MemberService} from "./member.service";

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  listing: any = [];

  constructor(
      private config: ConfigService,
      private http: HttpService,
      private member: MemberService
  ) { }

  async getListing(refresh = false) {
    if (this.listing.length === 0 || refresh) {
      let member_profile = await this.member.getProfile();

      return this.http.get(this.config.get_api_url('/api/method/erpx_prulia.prulia_trainings.doctype.prulia_training.prulia_training.get_training_list'), {
        member_name: member_profile.name
      }).then(res => {
        console.log(res);
        if (res['message'] instanceof Array) {
          this.listing = res['message'];
        }

        for (let event of this.listing) {
          if (!event['training_image'] || event['training_image'] === null) {
            event['training_image'] = "assets/images/Prulia-word-logo.png"
          } else if (!event['training_image'].startsWith("http")) {
            event['training_image'] = this.config.get_service_endpoint(true) + event['training_image']
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

  getItem(name) {
    return this.getListing().then(listing => {
      let res = null;

      listing.forEach(item => {
        if (item.name === name) { res = item; }
      });

      return res;
    });
  }

  create_training_registration(data) {
    return this.http.post(this.config.get_api_url('/api/method/erpx_prulia.prulia_trainings.doctype.prulia_training.prulia_training.add_attendance'), data)
  }
}
