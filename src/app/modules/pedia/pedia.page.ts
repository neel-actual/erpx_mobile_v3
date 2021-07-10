import { Component, OnInit } from '@angular/core';
import { PediaService } from '../../service/pedia.service';
import { ModalController } from '@ionic/angular';
import { ModalAddPage } from './modal-add/modal-add.page';

@Component({
	selector: 'app-pedia',
	templateUrl: './pedia.page.html',
	styleUrls: ['./pedia.page.scss'],
})
export class PediaPage implements OnInit {
	list: any = [];
	showSearch = false;
	search = '';
	showFab = true;
	prevScroll = 0;

	constructor(public pedia: PediaService, private modal: ModalController) {}

	ngOnInit() {
		this.pedia.getListing().then(data => (this.list = data));
	}

	doRefresh($event = null) {
		this.pedia
			.getListing(this.search, true)
			.then(data => (this.list = data))
			.finally(() => {
				$event?.target?.complete();
			});
	}

	async addPedia() {
		let modal = await this.modal.create({
			component: ModalAddPage,
			swipeToClose: true,
		});
		await modal.present();
		const { data } = await modal.onWillDismiss();
		let { refresh } = data;

		if (refresh) {
			this.doRefresh();
		}
	}

	onScroll($event) {
		this.showFab = this.prevScroll > $event.detail.scrollTop;
		this.prevScroll = $event.detail.scrollTop;
	}
}
