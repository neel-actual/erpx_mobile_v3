import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { ConfigService } from './config.service';

@Injectable({
	providedIn: 'root',
})
export class HttpService {
	constructor(
		private http: HTTP,
		private httpClient: HttpClient,
		private platform: Platform,
		private config: ConfigService
	) {
		this.http.setDataSerializer('json');
	}

	get(url, params = null, header = null) {
		if (true) {
			return new Promise((resolve, reject) => {
				this.httpClient
					.get(url, {
						params: params || {},
						withCredentials: true,
						observe: 'response',
					})
					.subscribe(
						(res: any) => {
							resolve(res.body);
						},
						err => {
							reject(err);
						}
					);
			});
		} else {
			this.http.setDataSerializer('json');
			params = params || {};
			return this.http
				.get(url, params || {}, header || {})
				.then(res => (res.data ? JSON.parse(res.data) : {}));
		}
	}

	post(url, data = null, params = null, header = null) {
		if (true) {
			return new Promise((resolve, reject) => {
				this.httpClient
					.post(url, data, {
						params: params || {},
						withCredentials: true,
						observe: 'body',
					})
					.subscribe(
						res => {
							resolve(res);
						},
						err => {
							reject(err);
						}
					);
			});
		} else {
			this.http.setDataSerializer('json');
			return this.http
				.post(url, data || {}, header || {})
				.then(res => (res.data ? JSON.parse(res.data) : {}))
				.catch(e => {
					console.error(e);
				});
		}
	}
}
