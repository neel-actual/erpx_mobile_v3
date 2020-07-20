import { Component, OnInit } from '@angular/core';
import {NewsService} from "../../service/news.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  list: any = [];

  constructor(
      private news: NewsService,
      private router: Router
  ) { }

  ngOnInit() {
    this.news.getListing().then(data => this.list = data);
  }

  doRefresh($event) {
    this.news.getListing(true)
        .then(data => this.list = data)
        .finally(() => {
          $event.target.complete();
        });
  }

  eventTapped(item) {
    if (item["type"] === "Link") {
      window.open(item["link"], '_blank');
    } else {
      this.router.navigate(['/app/more/news/' + item.name]);
    }
  }
}
