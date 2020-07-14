import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import {StatusBar} from "@ionic-native/status-bar/ngx";
import {SplashScreen} from "@ionic-native/splash-screen/ngx";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP } from '@ionic-native/http/ngx';
import {HttpClientModule} from '@angular/common/http';
import {NgxMaskIonicModule} from 'ngx-mask-ionic';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(),
    NgxMaskIonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    HTTP,
    InAppBrowser
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
