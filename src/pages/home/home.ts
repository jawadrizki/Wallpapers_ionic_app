import { Component } from '@angular/core';
import {NavController, Platform, AlertController} from 'ionic-angular';
import {FileTransfer, FileTransferObject} from "@ionic-native/file-transfer";
import {FileOpener} from "@ionic-native/file-opener";
import {DataProvider} from "../../providers/data/data";
import {ViewPage} from "../view/view";
import { Network } from '@ionic-native/network';
import {FavoritesPage} from "../favorites/favorites";
import {AdMobFree, AdMobFreeInterstitialConfig} from "@ionic-native/admob-free";
import {AppSettingsPage} from "../app-settings/app-settings";
import {ViewerPage} from "../viewer/viewer";

declare var cordova: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  dataDirectory:string = '';
  storageDirectory:string = '';
  imgs:any = [];
  imgSource:string;
  idInterADS:string = '';

  constructor(public navCtrl: NavController,
              public platform: Platform,
              public transfer:FileTransfer,
              private fileOpener: FileOpener,
              private dataProvider: DataProvider,
              public network: Network,
              public admob: AdMobFree,
              private alertCtrl: AlertController
  ) {

    let alert = this.alertCtrl.create({
      title: 'Connection Error',
      subTitle: 'Try to connect to the internet and try again !',
      buttons: ['Ok']
    });

    this.getImgs();

    let connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      this.getImgs()
    });

    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      alert.present()
      console.log('network was disconnected :-(');
    });
    const interConfig: AdMobFreeInterstitialConfig = {
      // add your config here
      // for the sake of this example we will just use the test config
      id: this.idInterADS
    };
    this.admob.interstitial.config(interConfig);




    //this.getimgs()
  }


  async getImgs() {
    this.imgSource = this.dataProvider.getImagesSources();
    let res = await this.dataProvider.getData();
    let i = 0;
    this.imgs = [];
    while (i < 4) {
      this.imgs.push(res[i]);
      i++;
    }
  }



  open(category){
    if(category.ad == 1){
      //console.log(category.ad)
      this.admob.interstitial.prepare();
      this.admob.interstitial.show();
      this.admob.interstitial.prepare();

    }
    this.navCtrl.push(ViewPage, {category: category})
  }


  goToFavorites(){
    this.navCtrl.push(FavoritesPage, {data: this.imgs})
  }

  goToSettings(){
    this.navCtrl.push(AppSettingsPage)
  }

  openImg(img, imgObject){
    this.navCtrl.push(ViewerPage, {img : img, imgObject: imgObject}).then(()=> console.log('Done'));
  }

}
