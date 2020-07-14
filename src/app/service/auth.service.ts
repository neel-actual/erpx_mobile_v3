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

    return this.http.post(this.config.get_api_url('/api/method/login'), credentials).then(data => {
      console.log(data);
      localStorage.setItem('user', usr);
      let cookie = this.config.getCookies(document.cookie);
      localStorage.setItem('session_id', cookie['sid']);

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
    return this.http.get(this.config.get_api_url('/api/method/logout')).then(() => {
      localStorage.clear();
      this.events.publish('logout', '');
    });
  }

  updatePassword(old_password, new_password) {
    let data = {
      old_password: old_password,
      new_password: new_password,
      logout_all_sessions: false
    };

    return this.http.post(this.config.get_api_url('/api/method/frappe.core.doctype.user.user.update_password'), data)
  }

  set_sid_cookie() {
    console.log("Session ID found", localStorage.getItem('session_id'));
    document.cookie = "sid=" + localStorage.getItem('session_id') +
        "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
  }
}
