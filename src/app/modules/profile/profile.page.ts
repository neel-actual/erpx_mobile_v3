import { Component, OnInit, NgZone } from '@angular/core';
import {MemberService} from "../../service/member.service";
import {AuthService} from "../../service/auth.service";
import {EventBus} from "../../event-bus.service";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  memberProfile: any = null;

  constructor(
      private member: MemberService,
      private auth: AuthService,
      private events: EventBus,
      private alertCtrl: AlertController,
      private zone: NgZone
  ) { }

  ngOnInit() {
    this.member.getProfile().then(data => {
      this.memberProfile = data;
    });
  }

  logout() {
    this.auth.logout();
  }

  selectPicture() {
    let options = { maximumImagesCount: 1, outputType: 1, disable_popover: true };

    window && window['imagePicker'] && window['imagePicker'].getPictures(results => {
      var result = results[0];

      this.events.publish('loading:start', 'Loading...');

      let b64 = result.split('base64,').pop();

      this.uploadPicture(result, b64);

      // if (result && Array.isArray(results)) {
      //   window && window['plugins'] && window['plugins'].Base64.encodeFile(result, (b64: string) => {
      //     b64 = b64.split('base64,').pop();
      //
      //     this.uploadPicture(result, b64);
      //   }, (err) => {
      //     this._displayError(err);
      //   })
      // }
      // else {
      //   this.events.publish('loading:end');
      // }
    }, (err) => {
      this._displayError(err);
    }, options);
  }

  async uploadPicture(path, b64) {
    if (getSize(b64) > 2000) { //file size can't exceed 2MB
      this.events.publish('loading:end');

      let alert = await this.alertCtrl.create({
        header: 'Error',
        subHeader: 'File limit size is 2MB',
        buttons: ['Dismiss']
      });
      await alert.present();
    }
    else {
      this.member.post_member_picture({
        filename: path.split('/').pop(),
        filedata: b64
      }).then(() => {
        this.events.publish('loading:end');
        this.member.getProfile(true).then(data => {
          this.memberProfile = data;
          this.zone.run(() => {
            console.log('enabled time travel');
          });
        });
      }).catch((e) => {
        this._displayError(e);
      })
    }
  }

  async _displayError(err) {
    console.error(err);
    let alert = await this.alertCtrl.create({
      header: 'Error',
      subHeader: 'Error in update',
      buttons: ['Dismiss']
    });
    this.events.publish('loading:end');
    await alert.present();
  }
}

//returns in kB
function getSize(base64) {
  return (4 * Math.ceil(base64.length / 3)) / 1000;
}
