import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-modal-comment',
	templateUrl: './modal-comment.page.html',
	styleUrls: ['./modal-comment.page.scss'],
})
export class ModalCommentPage implements OnInit {
	comment = '';

	constructor(private modal: ModalController) {}

	ngOnInit() {}

	dismiss(submit = true) {
		let { comment } = this;
		let data = {};
		comment = comment?.trim();
		if (submit) {
			data = { comment };
		}
		this.modal.dismiss(data);
	}
}
