import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClientModule, HttpBackend, HttpXhrBackend } from '@angular/common/http';
//ENABLE THIS ONLY FOR iOS
// import { NativeHttpModule, NativeHttpBackend, NativeHttpFallback } from 'ionic-native-http-connection-backend';

import { NgxMaskIonicModule } from 'ngx-mask-ionic';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@NgModule({
	declarations: [AppComponent],
	entryComponents: [],
	imports: [
		BrowserModule,
		IonicModule.forRoot(),
		NgxMaskIonicModule.forRoot(),
		AppRoutingModule,
		HttpClientModule,
		//ENABLE THIS ONLY FOR iOS
		// NativeHttpModule,
	],
	providers: [
		StatusBar,
		SplashScreen,
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
		HTTP,
		InAppBrowser,
		//ENABLE THIS ONLY FOR iOS
		// {provide: HttpBackend, useClass: NativeHttpFallback, deps: [Platform, NativeHttpBackend, HttpXhrBackend]},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
