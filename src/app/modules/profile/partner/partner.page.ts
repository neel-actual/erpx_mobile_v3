import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../../service/member.service';

@Component({
	selector: 'app-partner',
	templateUrl: './partner.page.html',
	styleUrls: ['./partner.page.scss'],
})
export class PartnerPage implements OnInit {
	memberProfile: any;

	constructor(private member: MemberService) {}

	ngOnInit() {
		this.getMember();
	}

	async getMember() {
		this.memberProfile = await this.member.getProfile();

		['pa_status', 'pi_status', 'maxis_status'].forEach(key => {
			if (!this.memberProfile[key]) {
				this.memberProfile[key] = 'No Records Found.';
			}
		});
	}
}
