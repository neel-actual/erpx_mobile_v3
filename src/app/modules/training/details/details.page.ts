import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrainingService } from '../../../service/training.service';
import { MemberService } from '../../../service/member.service';
import { ModalController } from '@ionic/angular';
import { EventBus } from '../../../event-bus.service';
import { ModalRegisterPage } from '../modal-register/modal-register.page';

@Component({
	selector: 'app-details',
	templateUrl: './details.page.html',
	styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
	item: any = null;
	qr_content: any = '';

	constructor(
		private route: ActivatedRoute,
		private training: TrainingService,
		private member: MemberService,
		private modal: ModalController,
		private events: EventBus
	) {}

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.training.getItem(params.name).then(async item => {
				this.item = item;
				this.item.member = await this.member.getProfile();

				this.qr_content = [
					this.item.name,
					this.item.member.name,
					this.item.member.agency_no,
				].join('/');
			});
		});

		this.events.subscribe('training:update', () => {
			this.training.getListing(true).then(async data => {
				(data || []).forEach(item => {
					if (this.item.name === item.name) {
						this.item = item;
					}
				});
				this.item.member = await this.member.getProfile();
				this.qr_content = [
					this.item.name,
					this.item.member.name,
					this.item.member.agency_no,
				].join('/');
			});
		});
	}

	register() {
		let temp = Object.assign({}, this.item);

		this.member.getProfile().then(member => {
			temp.meal_option = member.meal_option;
			if (temp.display_shirt_option == 1) {
				temp.shirt_size = member.shirt_size;
			}
			if (temp.display_accomodation_option == 1) {
				temp.accomodation = 'Yes';
			}
			temp.member = member;

			this.openRegisterModal(temp);
		});
	}

	async openRegisterModal(event) {
		let modal = await this.modal.create({
			component: ModalRegisterPage,
			swipeToClose: true,
			componentProps: {
				event: event,
			},
		});
		await modal.present();
	}
}
