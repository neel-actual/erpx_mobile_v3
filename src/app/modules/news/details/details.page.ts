import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NewsService} from "../../../service/news.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  item: any = null;

  constructor(
      private route: ActivatedRoute,
      private news: NewsService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.news.getItem(params.name).then(item => {
        this.item = item;
      })
    });
  }

}
