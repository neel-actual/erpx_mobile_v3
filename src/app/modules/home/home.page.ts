import { Component, OnInit } from '@angular/core';
import {HomeService} from "../../service/home.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  list: any = [];

  constructor(
      private home: HomeService,
      private router: Router
  ) {}

  ngOnInit() {
    this.home.getListing(true).then(data => this.list = data);
  }

  ionViewWillEnter() {
    this.home.getListing().then(data => this.list = data);
  }

  eventTapped(item) {
    if (item["type"] === "Link") {
      window.open(item["link"], '_blank');
    } else {
      this.router.navigate(['/app/home/' + item.name]);
    }
  }
}
