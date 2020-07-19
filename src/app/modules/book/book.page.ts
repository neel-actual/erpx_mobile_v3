import { Component, OnInit } from '@angular/core';
import {BookService} from "../../service/book.service";

@Component({
  selector: 'app-book',
  templateUrl: './book.page.html',
  styleUrls: ['./book.page.scss'],
})
export class BookPage implements OnInit {
  list: any = [];

  constructor(
      private books: BookService
  ) { }

  ngOnInit() {
    this.books.getListing().then(data => this.list = data);
  }

  doRefresh($event) {
    this.books.getListing(true)
        .then(data => this.list = data)
        .finally(() => {
          $event.target.complete();
        });
  }

}
