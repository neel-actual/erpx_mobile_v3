import { Injectable } from '@angular/core';
import {ConfigService} from './config.service';
import {HttpService} from './http.service';
import {EventBus} from "../event-bus.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any = null;

  constructor(
    private config: ConfigService,
    private http: HttpService,
    private events: EventBus
  ) { }

  isLoggedIn() {
    this.set_sid_cookie();

    return this.if_session_valid()
  }

  login (usr, pwd) {
    let credentials = {usr: usr, pwd: pwd, device: "mobile"};

    return this.http.post(this.config.get_api_url('/api/method/login'), credentials, {}).then(data => {
      localStorage.user = usr;
      let cookie = this.config.getCookies(document.cookie);
      localStorage.session_id = cookie['sid'];

      return data;
    });

    // return new Promise((resolve, reject) => {
    //   this.http.post(this.common.get_api_url('/api/method/login'), credentials, {
    //     observe: 'response',
    //     withCredentials: true
    //   })
    //     .subscribe(res => {
    //       // if(document.cookie !== ""){
    //       localStorage.user = username;
    //       let cookie = this.common.getCookies(document.cookie);
    //       localStorage.session_id = cookie["sid"];
    //       resolve(res.body);
    //       // } else {
    //       //   this.login(username, password).then(data => {
    //       //     resolve(data);
    //       //   },(error => {
    //       //     reject(error);
    //       //   })
    //       // }
    //     }, (err) => {
    //       reject(err);
    //     });
    // });
  }

  forgetPassword(usr, nric) {
    let data = {prulia_id: usr, nric_number: nric};

    return this.http.post(this.config.get_api_url('/api/method/erpx_prulia.prulia_members.doctype.prulia_member.prulia_member.forget_password'), data)
  }

  if_session_valid() {
    return this.http.get(this.config.get_api_url('/api/method/frappe.auth.get_logged_user'))

    // return new Promise((resolve, reject) => {
    //   this.http.get(this.config.get_api_url('/api/method/frappe.auth.get_logged_user'), {
    //     observe: 'response',
    //     withCredentials: true
    //   })
    //     .subscribe(res => {
    //       resolve(res.body);
    //     }, (err) => {
    //       reject(err)
    //     });
    // });
  }

  logout() {
    localStorage.clear();
    this.events.publish('logout', '');
  }


  set_sid_cookie() {
    console.log("Session ID found", localStorage.session_id);
    document.cookie = "sid=" + localStorage.session_id +
      "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
  }
}
