import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AppVersion} from "@ionic-native/app-version";

/**
 * Generated class for the AboutUsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about-us',
  templateUrl: 'about-us.html',
})
export class AboutUsPage {

  applicationVersion: any;
  applicationName: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private appVersion: AppVersion) {
     this.appVersion.getVersionNumber().then((version) => {
       this.applicationVersion = version
    });

    this.appVersion.getAppName().then((name) => {
      this.applicationName  = name
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutUsPage');
  }

}
