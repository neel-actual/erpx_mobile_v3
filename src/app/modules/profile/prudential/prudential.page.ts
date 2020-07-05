import { Component, OnInit } from '@angular/core';
import {MemberService} from "../../../service/member.service";

@Component({
  selector: 'app-prudential',
  templateUrl: './prudential.page.html',
  styleUrls: ['./prudential.page.scss'],
})
export class PrudentialPage implements OnInit {
  memberProfile: any;

  constructor(
      private member: MemberService,
  ) { }

  ngOnInit() {
    this.getMember();
  }

  async getMember() {
    this.memberProfile = await this.member.getProfile();
  }

}
