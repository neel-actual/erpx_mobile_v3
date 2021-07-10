import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-news-modal',
	templateUrl: './news-modal.page.html',
	styleUrls: ['./news-modal.page.scss'],
})
export class NewsModalPage implements OnInit {
	slideOpts: any = {
		initialSlide: 1,
		speed: 400,
	};
	@Input() list: any;

	constructor(private modalCtrl: ModalController) {}

	ngOnInit() {}

	dismiss() {
		this.modalCtrl.dismiss({});
	}
}
