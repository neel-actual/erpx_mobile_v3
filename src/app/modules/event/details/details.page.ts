import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EventService} from "../../../service/event.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  item: any = null;

  constructor(
      private route: ActivatedRoute,
      private event: EventService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.event.getItem(params.name).then(item => {
        this.item = item;
      })
    });
  }

}
