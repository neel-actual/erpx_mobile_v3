import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EventService} from "../../../service/event.service";
import {MemberService} from "../../../service/member.service";
import {ModalController} from "@ionic/angular";
import {ModalRegisterPage} from "../modal-register/modal-register.page";

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  item: any = null;

  constructor(
      private route: ActivatedRoute,
      private event: EventService,
      private member: MemberService,
      private modal: ModalController
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.event.getItem(params.name).then(item => {
        this.item = item;
      })
    });
  }

  register() {
    let temp = Object.assign({}, this.item);

    this.member.getProfile().then(member => {
      temp.meal_option = member.meal_option;
      if (temp.display_shirt_option == 1) {
        temp.shirt_size = member.shirt_size;
      }
      if (temp.display_accomodation_option == 1) {
        temp.accomodation = "Yes";
      }

      this.openRegisterModal(temp)
    });
  }

  async openRegisterModal(event) {
    let modal = await this.modal.create({
      component: ModalRegisterPage,
      componentProps: {
        event: event
      }
    });
    await modal.present();
  }
}
