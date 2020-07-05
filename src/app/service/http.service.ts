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
      params = params || {};
      params.withCredentials = true;
      params.observe = 'response';
      return new Promise((resolve, reject) => {
        this.httpClient.get(url, params).subscribe((res: any) => { resolve(res.body); }, (err) => { reject(err) });
      });
    } else {
      params = params || {};
      return this.http.get(url, params.params || {}, header || {}).then(res => res.data ? JSON.parse(res.data) : {});
    }
  }

  post(url, data = null, params = null, header = null) {
    if (this.config.isDesktop()) {
      params = params || {};
      params.withCredentials = true;
      params.observe = 'response';
      return new Promise((resolve, reject) => {
        this.httpClient.post(url, data, {
          params: params
        }).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
      });
    }
    else {
      return this.http.post(url, data || {}, header || {})
          .then(res => res.data ? JSON.parse(res.data) : {})
          .catch(e => {
            console.error(e);
          })
    }
  }
}
