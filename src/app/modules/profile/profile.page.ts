import { Component, OnInit } from '@angular/core';
import {MemberService} from "../../service/member.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  memberProfile: any = null;

  constructor(
      private member: MemberService
  ) { }

  ngOnInit() {
    this.member.getProfile().then(data => {
      this.memberProfile = data;
    });
  }

}
