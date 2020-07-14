import { Injectable } from '@angular/core';
import {ConfigService} from "./config.service";
import {HttpService} from "./http.service";
import {MemberService} from "./member.service";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  categories: any = [];

  constructor(
      private config: ConfigService,
      private http: HttpService,
      private member: MemberService
  ) { }

  get_categories(refresh = false) {
    if (this.categories.length === 0 || refresh) {

      return this.http.get(this.config.get_api_url('/api/method/erpx_prulia.prulia_members.doctype.prulia_feedback_category.prulia_feedback_category.get_categories')).then(res => {
        if (res['message'] instanceof Array) {
          this.categories = res['message'];
        }

        return this.categories;
      });
    }
    else {
      return Promise.resolve(this.categories);
    }
  }

  async submit_feedback(category, remark) {
    let member = await this.member.getProfile();

    return this.http.post(this.config.get_api_url('/api/method/erpx_prulia.prulia_members.doctype.prulia_feedback.prulia_feedback.submit_feedback'), {
        category: category,
        remark: remark,
        member: member.name,
        member_name: member.full_name
      }, {withCredentials: true}).then(res => {
        this.categories = res['message'];
        return res;
    })
  }
}
