import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClient } from '@angular/common/http';
import {Platform} from '@ionic/angular';
import {ConfigService} from './config.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HTTP, 
    private httpClient: HttpClient, 
    private platform: Platform,
    private config: ConfigService
    ) { }

  get(url, params = null, header = null) {
    if (this.config.isDesktop()) {
      return new Promise((resolve, reject) => {
        this.httpClient.get(url, header || {
          observe: 'response',
          withCredentials: true
        }).subscribe((res: any) => { resolve(res.body); }, (err) => { reject(err) });
      });
    } else {
      return this.http.get(url, params || {}, params || {}).then(res => res.data ? JSON.parse(res.data) : {});
    }
  }

  post(url, data = null, header = null) {
    if (this.config.isDesktop()) {
      return new Promise((resolve, reject) => {
        this.httpClient.post(url, data, {
          observe: 'response',
          withCredentials: true
        }).subscribe(res => {
          resolve(res.body);
        }, (err) => {
          reject(err);
        });
      });
    }
    else {
      return this.http.post(url, data || {}, header || {}).then(res => res.data ? JSON.parse(res.data) : {});
    }
  }
}
