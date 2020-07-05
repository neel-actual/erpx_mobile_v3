import { Component, OnInit } from '@angular/core';
import {EventBus} from "../../../event-bus.service";
import {AuthService} from "../../../service/auth.service";

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {

  constructor(
      private auth: AuthService,
      private events: EventBus
  ) { }

  ngOnInit() {
  }

  update(form) {
    let {old_password, new_password} = form.value;

    this.events.publish('loading:start', 'Updating');
    this.auth.updatePassword(old_password, new_password).then(() => {
      this.events.publish('toast', {
        message: 'Password updated'
      })
      form.reset();
    }).catch((e) => {
      this.events.publish('toast', {
        message: e.error ? e.error.message : 'Forbidden',
        color: 'danger'
      })
    }).finally(() => {
      this.events.publish('loading:end', '');
    })
  }
}
