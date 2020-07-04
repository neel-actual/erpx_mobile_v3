import { Component, OnInit } from '@angular/core';
import {MemberService} from "../../service/member.service";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  memberProfile: any = null;

  constructor(
      private member: MemberService,
      private auth: AuthService
  ) { }

  ngOnInit() {
    this.member.getProfile().then(data => {
      this.memberProfile = data;
    });
  }

  logout() {
    this.auth.logout();
  }
}
