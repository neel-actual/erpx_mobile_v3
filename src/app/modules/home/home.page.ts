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
    this.home.getListing().then(data => {
      console.log(data)
      this.list = data;
    });
  }

  goTo(name) { this.router.navigate(['app/home/' + name]); }
}
