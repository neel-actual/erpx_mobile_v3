import { Component, OnInit } from '@angular/core';
import {PartnerService} from "../../service/partner.service";

@Component({
  selector: 'app-partner',
  templateUrl: './partner.page.html',
  styleUrls: ['./partner.page.scss'],
})
export class PartnerPage implements OnInit {
  list: any = [];

  constructor(
      private partner: PartnerService
  ) { }

  ngOnInit() {
    this.partner.getListing().then(data => this.list = data);
  }

}
