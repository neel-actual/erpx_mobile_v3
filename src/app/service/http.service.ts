import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClient } from '@angular/common/http';
import {Platform} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HTTP, 
    private httpClient: HttpClient, 
    private platform: Platform
    ) { }

  isDesktop() {
    return this.platform.is('desktop');
  }

  get(url, params = null, header = null) {
    if (this.isDesktop()) {
      return new Promise((resolve, reject) => {
        this.httpClient.get(url, header || {
          observe: 'response',
          withCredentials: true
        }).subscribe((res: any) => { resolve(res.body); }, (err) => { reject(err) });
      });
    } else {
      return this.http.get(url, params || {}, params || {});
    }
  }

  post(url, data = null, header = null) {
    if (this.isDesktop()) {
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
      return this.http.post(url, data || {}, header || {}); 
    }
  }
}
