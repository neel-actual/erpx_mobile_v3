import { Component, OnInit } from '@angular/core';
import {EventService} from "../../service/event.service";

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  list: any = [];

  constructor(
      private event: EventService
  ) { }

  ngOnInit() {
    this.event.getListing().then(data => this.list = data);
  }

  doRefresh($event) {
    this.event.getListing(true)
        .then(data => this.list = data)
        .finally(() => {
          $event.target.complete();
        });
  }
}
