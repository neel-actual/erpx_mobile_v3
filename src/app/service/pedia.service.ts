import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class PediaService {
	listing: any = [];
	comments: any = {};
	fields: any = [];

	constructor(
		private config: ConfigService,
		private http: HttpService,
		private httpClient: HttpClient
	) {}

	getListing(search = '', refresh = false) {
		if (this.listing.length === 0 || refresh) {
			return this.http
				.post(
					this.config.get_api_url(
						'/api/method/erpx_prulia.prulia_pedia.doctype.prulia_pedia.prulia_pedia.get_pedia_posts'
					),
					{ search }
				)
				.then(res => {
					this.listing = [];

					if (res['message'] instanceof Array) {
						this.listing = res['message'];
					}

					return this.listing;
				});
		} else {
			return Promise.resolve(this.listing);
		}
	}

	getComments(id, refresh = false) {
		this.comments[id] = this.comments[id] || [];
		if (this.comments[id].length === 0 || refresh) {
			return this.http
				.post(
					this.config.get_api_url(
						`/api/method/erpx_prulia.prulia_pedia.doctype.prulia_pedia.prulia_pedia.get_pedia_comments`
					),
					{ id }
				)
				.then(res => {
					this.comments[id] = [];

					if (res['message'] instanceof Array) {
						this.comments[id] = res['message'];
					}

					return this.comments[id];
				});
		} else {
			return Promise.resolve(this.comments[id]);
		}
	}

	getMeta(refresh = false) {
		if (this.fields.length === 0 || refresh) {
			return this.http
				.post(
					this.config.get_api_url(
						`/api/method/erpx_prulia.prulia_pedia.doctype.prulia_pedia.prulia_pedia.get_pedia_meta`
					)
				)
				.then(res => {
					this.fields = [];

					let { fields } = res['message'];
					this.fields = fields || [];

					return this.fields;
				});
		} else {
			return Promise.resolve(this.fields);
		}
	}

	addComments(data) {
		return this.http
			.post(
				this.config.get_api_url(
					'/api/method/erpx_prulia.prulia_pedia.doctype.prulia_pedia.prulia_pedia.add_comment'
				),
				data
			)
			.then(res => {
				// @ts-ignore
				let { message } = res;

				return message;
			});
	}

	createPedia(data) {
		return this.http
			.post(
				this.config.get_api_url(
					'/api/method/erpx_prulia.prulia_pedia.doctype.prulia_pedia.prulia_pedia.create_new_post'
				),
				data
			)
			.then(res => {
				// @ts-ignore
				const { message } = res;
				return message;
			});
	}

	updatePedia(data) {
		return this.http
			.post(
				this.config.get_api_url(
					'/api/method/erpx_prulia.prulia_pedia.doctype.prulia_pedia.prulia_pedia.update_post'
				),
				data
			)
			.then(res => {
				// @ts-ignore
				const { message } = res;
				return message;
			});
	}

	uploadAttachment(data) {
		data = Object.assign(data, {
			from_form: 1,
			cmd: 'uploadfile',
		});

		return new Promise((resolve, reject) => {
			return this.httpClient
				.post(this.config.get_api_url(''), urlEncode(data), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
					},
					withCredentials: true,
				})
				.subscribe(
					res => {
						let msg = res['message'] || {};
						let { file_url } = msg;

						return this.updatePedia({
							name: data.docname,
							[data.fieldname]: file_url,
						})
							.then(resolve)
							.catch(reject);
					},
					err => {
						reject(err);
					}
				);
		});

		function urlEncode(obj) {
			let str = [];

			for (let key in obj) {
				if (obj.hasOwnProperty(key)) {
					str.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
				}
			}

			return str.join('&');
		}
	}
}
