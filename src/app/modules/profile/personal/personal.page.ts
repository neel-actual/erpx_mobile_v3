import { Component, OnInit } from '@angular/core';
import {MemberService} from "../../../service/member.service";
import {EventBus} from "../../../event-bus.service";

@Component({
  selector: 'app-personal',
  templateUrl: './personal.page.html',
  styleUrls: ['./personal.page.scss'],
})

export class PersonalPage implements OnInit {
  memberProfile: any;

  constructor(
      private member: MemberService,
      private events: EventBus
  ) { }

  ngOnInit() {
    this.getMember();
  }

  async getMember() {
    this.memberProfile = await this.member.getProfile();
  }

  update(form) {
    let values = form.value;

    Object.keys(values).forEach(key => {
      this.memberProfile[key] = values[key];
    });

    this.events.publish('loading:start', 'Updating');
    this.member.postProfile(this.memberProfile).then(() => {

    }).catch(() => {

    }).finally(() => {
      this.events.publish('loading:end', '');
    })
  }
}
