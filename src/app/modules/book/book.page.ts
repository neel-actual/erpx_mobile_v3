import { Component, OnInit } from '@angular/core';
import { BookService } from '../../service/book.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-book',
	templateUrl: './book.page.html',
	styleUrls: ['./book.page.scss'],
})
export class BookPage implements OnInit {
	list: any = [];

	constructor(private books: BookService, private router: Router) {}

	ngOnInit() {
		this.books.getListing().then(data => (this.list = data));
	}

	doRefresh($event) {
		this.books
			.getListing(true)
			.then(data => (this.list = data))
			.finally(() => {
				$event.target.complete();
			});
	}

	eventTapped(item) {
		if (item.link) {
			window.open(item['link'], '_blank');
		} else {
			this.router.navigate(['/app/more/book/' + item.name]);
		}
	}
}
