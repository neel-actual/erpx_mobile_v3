import { Component, OnInit } from '@angular/core';
import {NewsService} from "../../service/news.service";

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  list: any = [];

  constructor(
      private news: NewsService
  ) { }

  ngOnInit() {
    this.news.getListing().then(data => this.list = data);
  }

}
