import { Component, OnInit } from '@angular/core';
import {ToastController} from "@ionic/angular";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  constructor(
      private toast: ToastController,
      private auth: AuthService
  ) { }

  ngOnInit() {}

  submit(form) {
    let {usr, nric} = form.value;

    return this.auth.forgetPassword(usr, nric).then(data => {
      this.presentToast('Password is reset. Please check you inbox');
    }).catch((e) => {
      let msg = e && e.error && e.error.message;

      if (!msg) {
        if (e.error && e.error._server_messages) {
          e = JSON.parse(e.error._server_messages);
          msg = JSON.parse(e[0]).message;
        }
      }
      if (!msg) { msg = 'Oops, please try again!' }

      this.presentToast(msg, 'danger');
    });
  }

  async presentToast(msg, color = 'success') {
    let toast = await this.toast.create({
      message: msg,
      duration: 2000,
      color: color
    });

    await toast.present();
  }

}
