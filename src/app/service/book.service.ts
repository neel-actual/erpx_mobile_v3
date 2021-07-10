import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpService } from './http.service';

@Injectable({
	providedIn: 'root',
})
export class BookService {
	listing: any = [];

	constructor(private config: ConfigService, private http: HttpService) {}

	getListing(refresh = false) {
		if (this.listing.length === 0 || refresh) {
			return this.http
				.get(
					this.config.get_api_url(
						'/api/method/erpx_prulia.prulia_news.doctype.prulia_book.prulia_book.get_books_list'
					)
				)
				.then(res => {
					if (res['message'] instanceof Array) {
						this.listing = res['message'];
					}

					for (let book of this.listing) {
						if (!book['book_image'] || book['book_image'] === null) {
							book['book_image'] = 'assets/images/Prulia-word-logo.png';
						} else if (!book['book_image'].startsWith('http')) {
							book['book_image'] =
								this.config.get_service_endpoint(true) + book['book_image'];
						}
					}

					return this.listing;
				});
		} else {
			return Promise.resolve(this.listing);
		}
	}

	getItem(name) {
		return this.getListing().then(listing => {
			let res = null;

			listing.forEach(item => {
				if (item.name === name) {
					res = item;
				}
			});

			return res;
		});
	}
}
