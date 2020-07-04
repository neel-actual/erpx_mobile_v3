import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TrainingService} from "../../../service/training.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  item: any = null;

  constructor(
      private route: ActivatedRoute,
      private training: TrainingService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.training.getItem(params.name).then(item => {
        this.item = item;
      })
    });
  }

}
