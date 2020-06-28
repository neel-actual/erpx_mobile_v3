import { Injectable } from '@angular/core';
import {Platform} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private platform: Platform) { }

  isDesktop() {
    return this.platform.is('mobileweb');
  }

  getCookies(source) {
    let c = source || document.cookie, v = 0, cookies = {};
    if (document.cookie.match(/^\s*\$Version=(?:"1"|1);\s*(.*)/)) {
      c = RegExp.$1;
      v = 1;
    }
    if (v === 0) {
      c.split(/[,;]/).map(function (cookie) {
        var parts = cookie.split(/=/, 2),
          name = decodeURIComponent(parts[0].trimLeft()),
          value = parts.length > 1 ? decodeURIComponent(parts[1].trimRight()) : null;
        if (value && value.charAt(0) === '"') {
          value = value.substr(1, value.length - 2);
        }
        cookies[name] = value;
      });
    } else {
      c.match(/(?:^|\s+)([!#$%&'*+\-.0-9A-Z^`a-z|~]+)=([!#$%&'*+\-.0-9A-Z^`a-z|~]*|"(?:[\x20-\x7E\x80\xFF]|\\[\x00-\x7F])*")(?=\s*[,;]|$)/g).map(function ($0, $1) {
        var name = $0,
          value = $1.charAt(0) === '"'
            ? $1.substr(1, -1).replace(/\\(.)/g, "$1")
            : $1;
        cookies[name] = value;
      });
    }
    return cookies;
  }

  get_api_url(URL) {
    return this.get_service_endpoint() + URL;
  }

  get_service_endpoint(server = null) {
    // return "http://167.99.77.197:8000";
    if (!server && this.isDesktop()) {
      return '';
    }
    else { return 'https://www.prulia.org.my'; }
  }

  getOneSignalAppId() {
    // return 'd76fe5ec-8782-455a-8261-6a73653d7bb3'; //dev
    return 'dc5341a7-479c-4ccb-b2c4-1f484ecfe40c'; //prod
  }
}
