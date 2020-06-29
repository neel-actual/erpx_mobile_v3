import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PartnerService} from "../../../service/partner.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  item: any = null;

  constructor(
      private route: ActivatedRoute,
      private partner: PartnerService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.partner.getItem(params.name).then(item => {
        this.item = item;
      })
    });
  }

}
