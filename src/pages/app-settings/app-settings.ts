import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ViewPage} from "../view/view";
import {Consent} from "../../../plugins/cordova-plugin-google-consent/www/consent-typescript-wrapper";

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-app-settings',
  templateUrl: 'app-settings.html',
})
export class AppSettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private consent:Consent ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  home(){
    this.navCtrl.setRoot(ViewPage);
  }

  lunchSettings(){
    this.consent.changeConsentDecision('https://1drv.ms/w/s!AgAVDfqZTM5rfy46nSpFuUYsEHw', false)
      .then((result) => {
      console.log(result);
    })
      .catch((error) => {
        console.log(error);
      });

  }
}

