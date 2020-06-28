import { Component, OnInit } from '@angular/core';
import {HomeService} from "../../service/home.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  list: any = [];

  constructor(
      private home: HomeService
  ) {}

  ngOnInit() {
    this.home.loadListing().then(data => {
      this.list = data;
    });
  }
}
