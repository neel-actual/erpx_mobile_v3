import { Component, OnInit } from '@angular/core';
import {TrainingService} from "../../service/training.service";

@Component({
  selector: 'app-training',
  templateUrl: './training.page.html',
  styleUrls: ['./training.page.scss'],
})
export class TrainingPage implements OnInit {
  list: any = [];

  constructor(
      private training: TrainingService
  ) { }

  ngOnInit() {
    this.training.getListing().then(data => this.list = data);
  }

  doRefresh($event) {
    this.training.getListing(true)
        .then(data => this.list = data)
        .finally(() => {
          $event.target.complete();
        });
  }
}
