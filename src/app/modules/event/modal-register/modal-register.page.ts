import { Component, Input, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { EventBus } from '../../../event-bus.service';
import { EventService } from '../../../service/event.service';

@Component({
	selector: 'app-modal-register',
	templateUrl: './modal-register.page.html',
	styleUrls: ['./modal-register.page.scss'],
})
export class ModalRegisterPage implements OnInit {
	@Input() event: any;
	languages: string[] = [];
	acknowledgement: boolean = false;

	constructor(
		private modal: ModalController,
		private alert: AlertController,
		private toast: ToastController,
		private eventService: EventService,
		private events: EventBus
	) {}

	ngOnInit() {
		this.eventService.getLang(this.event.position_restriction).then(data => {
			data.forEach(lang => {
				this.languages.push(lang.language);
			});
			this.event.pref_lang = this.languages[0];
		});
	}

	save() {
		this.events.publish('loading:start', 'Saving...');
		if (this.acknowledgement) {
			this.eventService
				.create_event_registration({
					member: this.event.member.name,
					member_name: this.event.member.full_name,
					event: this.event.name,
					meal: this.event.meal_option,
					shirt: this.event.shirt_size,
					accomodation: this.event.accomodation,
					pref_lang: this.event.pref_lang,
				})
				.then(() => {
					this._createToast('Registration was updated successfully');

					this.events.publish('loading:end');
					this.events.publish('event:update');
					this.dismiss();
				})
				.catch(e => {
					this._displayError(e);
				});
		} else {
			this._displayAckError();
		}
	}

	dismiss() {
		this.modal.dismiss({});
	}

	async _displayAckError() {
		console.log('No acknowledgement');
		let alert = await this.alert.create({
			header: 'Alert',
			message: 'Please kindly acknowledge the declaration by clicking the checkbox in the form',
			buttons: ['Dismiss'],
		});
		this.events.publish('loading:end', '');
		await alert.present();
	}

	async _displayError(error) {
		let alert = await this.alert.create({
			header: 'Error',
			message: 'Error in update',
			buttons: ['Dismiss'],
		});
		this.events.publish('loading:end', '');
		await alert.present();
	}

	async _createToast(message) {
		let toast = await this.toast.create({
			message: message,
			duration: 10000,
			buttons: [
				{
					text: 'Done',
					role: 'cancel',
				},
			],
			position: 'bottom',
		});

		await toast.present();
	}
}
