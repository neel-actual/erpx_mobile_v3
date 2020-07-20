import { Component, OnInit } from '@angular/core';
import {PartnerService} from "../../service/partner.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-partner',
  templateUrl: './partner.page.html',
  styleUrls: ['./partner.page.scss'],
})
export class PartnerPage implements OnInit {
  list: any = [];

  constructor(
      private partner: PartnerService,
      private router: Router
  ) { }

  ngOnInit() {
    this.partner.getListing().then(data => this.list = data);
  }

  eventTapped(item) {
    if (item["type"] === "Link") {
      window.open(item["link"], '_blank');
    } else {
      this.router.navigate(['/app/more/partner/' + item.name]);
    }
  }
}
