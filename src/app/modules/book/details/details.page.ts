import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BookService} from "../../../service/book.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  item: any = null;

  constructor(
      private route: ActivatedRoute,
      private books: BookService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.books.getItem(params.name).then(item => {
        this.item = item;
      })
    });
  }

}
