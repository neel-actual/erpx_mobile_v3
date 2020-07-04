import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {ConfigService} from "./config.service";

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  memberProfile: {
    agency_no: string,
    prudential_id: string,
    name: string,
    full_name: string,
    branch: string,
    meal_option: string,
    nirc_number: string,
    user_id: string,
    cell_number: string,
    profile_photo: string,
    region: string,
    shirt_size: string,
  };

  constructor(
      private http: HttpService,
      private config: ConfigService
  ) { }

  getProfile(refresh = false) {
    if (!this.memberProfile || refresh) {
      return this.http.get(this.config.get_api_url('/api/method/erpx_prulia.prulia_members.doctype.prulia_member.prulia_member.mobile_member_login')).then(data => {
        return this._updateProfile(data['message']);
      });
    }
    else { return Promise.resolve(this.memberProfile); }
  }

  postProfile(data) {
    return this.http.post(
        this.config.get_api_url('/api/method/erpx_prulia.prulia_members.doctype.prulia_member.prulia_member.update_member_pref'),
        data
    ).then(data => {
      return this._updateProfile(data['message']);
    })
  }

  _updateProfile(member) {
    this.memberProfile = member;

    //profile photo
    if (this.memberProfile.profile_photo !== undefined && this.memberProfile.profile_photo !== "") {
      if (this.memberProfile.profile_photo.indexOf(this.config.get_service_endpoint(true)) === -1) {
        this.memberProfile.profile_photo = this.config.get_service_endpoint(true) + '/' + this.memberProfile.profile_photo;
      }
    } else {
      this.memberProfile.profile_photo = "assets/images/avatar_placeholder-1.png";
    }

    //smart partners
    ['pa_status', 'pi_status', 'maxis_status'].forEach(function (key) {
      if (this.memberProfile[key]) {
        this.memberProfile[key] = formatDate(this.memberProfile[key]);
      }
    }.bind(this));

    return this.memberProfile;
  }

}

function formatDate(date) {
  if (typeof date === 'string') { date = new Date(date); }

  var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
      ],
      day = date.getDate(),
      monthIndex = date.getMonth(),
      year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}
