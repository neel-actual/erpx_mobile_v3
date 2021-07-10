import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../../service/training.service';
import { EventBus } from '../../event-bus.service';

@Component({
	selector: 'app-training',
	templateUrl: './training.page.html',
	styleUrls: ['./training.page.scss'],
})
export class TrainingPage implements OnInit {
	list: any = [];

	constructor(private training: TrainingService, private events: EventBus) {}

	ngOnInit() {
		this.training.getListing().then(data => (this.list = data));
		this.events.subscribe('training:update', () => {
			this.training.getListing(true).then(data => (this.list = data));
		});
	}

	doRefresh($event) {
		this.training
			.getListing(true)
			.then(data => (this.list = data))
			.finally(() => {
				$event.target.complete();
			});
	}
}
