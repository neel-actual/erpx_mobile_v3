import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PediaService } from '../../../service/pedia.service';
import { ModalController } from '@ionic/angular';
import { ModalCommentPage } from './modal-comment/modal-comment.page';

@Component({
	selector: 'app-details',
	templateUrl: './details.page.html',
	styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
	currentId: any;
	item: any;
	sections: any;
	comments = [];
	replies = {};
	showFab = true;
	prevScroll = 0;

	constructor(
		private route: ActivatedRoute,
		private modal: ModalController,
		public pedia: PediaService
	) {}

	ngOnInit() {
		this.route.params.subscribe(params => {
			let { name } = params;

			this.currentId = name;
			this.doRefresh();
		});
	}

	doRefresh($event = null) {
		Promise.all([
			this.pedia.getListing('', !!$event),
			this.pedia.getComments(this.currentId, !!$event),
			this.pedia.getMeta(!!$event),
		])
			.then(data => {
				this.item = data[0].find(item => item.name === this.currentId);
				this.groupComments(data[1]);
				this.formatFields(data[2]);
			})
			.finally(() => {
				$event?.target?.complete();
			});
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

		this.sections = sections.filter(
			section => section.fields.length && section.options?.includes('show')
		);
	}

	groupComments(comments) {
		this.comments = comments?.filter(comment => !comment.reply_to);
		this.replies = {};
		let replies = comments?.filter(comment => comment.reply_to);

		replies.forEach(reply => {
			this.replies[reply.reply_to] = this.replies[reply.reply_to] || [];
			this.replies[reply.reply_to].push(reply);
		});
	}

	shortName(name) {
		return name
			.split(' ')
			.map(item => item[0])
			.slice(0, 2)
			.join('');
	}

	async onComment(replyTo = null, item) {
		await item?.close();
		let modal = await this.modal.create({
			component: ModalCommentPage,
			swipeToClose: true,
		});
		await modal.present();
		const { data } = await modal.onWillDismiss();
		let { comment } = data;

		if (comment) {
			let body = {
				parent: this.currentId,
				comment,
				reply_to: undefined,
			};

			if (replyTo) {
				body.reply_to = replyTo;
			}

			this.pedia.addComments(body).then(res => {
				if (res.reply_to) {
					this.replies[res.reply_to] = this.replies[res.reply_to] || [];
					this.replies[res.reply_to].unshift(res);
				} else {
					this.comments.unshift(res);
				}
			});
		}
	}

	onScroll($event) {
		this.showFab = this.prevScroll > $event.detail.scrollTop;
		this.prevScroll = $event.detail.scrollTop;
	}
}
