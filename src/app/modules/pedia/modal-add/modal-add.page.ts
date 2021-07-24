import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { PediaService } from '../../../service/pedia.service';

@Component({
	selector: 'app-modal-add',
	templateUrl: './modal-add.page.html',
	styleUrls: ['./modal-add.page.scss'],
})
export class ModalAddPage implements OnInit {
	mode = null;
	feedbackSections = [];
	helpSections = [];
	data = {};
	uploadedFiles = {};

	constructor(
		private modal: ModalController,
		private alert: AlertController,
		public pedia: PediaService
	) {}

	ngOnInit() {
		this.pedia.getMeta().then(data => {
			this.formatFields(data);
		});
	}

	dismiss() {
		this.modal.dismiss({});
	}

	formatFields(meta) {
		let sections = [];
		let index = -1;

		meta?.forEach(item => {
			if (item.fieldtype === 'Section Break') {
				index++;
				sections[index] = {
					...item,
					fields: [],
				};
			} else if (sections[index]?.fields) {
				if (!item.hidden) {
					sections[index].fields.push(item);
				}
			}
		});

		this.feedbackSections = sections.filter(
			section => section.fields.length && section.options?.includes('feedback')
		);
		this.helpSections = sections.filter(
			section => section.fields.length && section.options?.includes('help')
		);
	}

	splitOptions(options) {
		return options.split(/\n/).filter(item => item);
	}

	replaceHeader(text) {
		return text.replace('*', '');
	}

	async submit(form) {
		let data = {};
		Object.keys(form).forEach(key => {
			data[key] = form[key].value || '';
			if (this.uploadedFiles[key]) {
				data[key] = '';
			}
		});

		this.pedia.createPedia(data).then(data => {
			const tasks = [];
			const { name } = data;

			Object.keys(this.uploadedFiles).forEach(key => {
				let obj = this.uploadedFiles[key];
				obj.docname = name;

				tasks.push(this.pedia.uploadAttachment(obj));
			});

			Promise.all(tasks).then(() => {
				this.modal.dismiss({ refresh: true });
			});
		});
	}

	async attachFile($event, name) {
		let [file] = $event?.target?.files;

		if (!file) {
			return;
		}

		if (file.size > 5000000) {
			let alert = await this.alert.create({
				header: 'Error',
				subHeader: 'File limit size is 5MB',
				buttons: ['Dismiss'],
			});
			await alert.present();

			return false;
		}

		this.toBase64(file).then(filedata => {
			this.uploadedFiles[name] = {
				doctype: 'PRULIA Pedia',
				fieldname: name,
				filename: file.name,
				file_size: file.size,
				filedata,
			};
		});
	}

	toBase64(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			// @ts-ignore
			reader.onload = () => resolve(reader.result?.split('base64,').pop().trim());
			reader.onerror = error => reject(error);
		});
	}

	sanitizeFileName(name) {
		let regex = /\\/g;
		return (name || 'file').split(regex).pop();
	}
}
