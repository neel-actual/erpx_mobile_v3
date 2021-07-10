import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../../../service/home.service';

@Component({
	selector: 'app-details',
	templateUrl: './details.page.html',
	styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
	item: any = null;

	constructor(private route: ActivatedRoute, private home: HomeService) {}

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.home.getItem(params.name).then(item => {
				this.item = item;
			});
		});
	}
}
