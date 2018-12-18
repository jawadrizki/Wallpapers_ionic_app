import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, PopoverController} from 'ionic-angular';
import {FileOpener} from "@ionic-native/file-opener";
import {FileTransfer, FileTransferObject} from "@ionic-native/file-transfer";
import {DataProvider} from "../../providers/data/data";
import {HomePage} from "../home/home";
import {AdMobFree, AdMobFreeInterstitialConfig} from "@ionic-native/admob-free";
import {FavoritesPage} from "../favorites/favorites";
import {AppSettingsPage} from "../app-settings/app-settings";
import {Storage} from "@ionic/storage";
import {ViewerPage} from "../viewer/viewer";


/**
 * Generated class for the ViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view',
  templateUrl: 'view.html',
})
export class ViewPage {


  pics:any = [];
  imgsSource:string;
  activeSegment:string = 'pictures';
  favImages:any = [];
  isEmpty:boolean = false;
  favList:any = [];


  dataInitialised:boolean;

  idInterADS:string = 'ca-app-pub-3576496969361263/7051607637';


  constructor(public navCtrl: NavController,
              public platform: Platform,
              public transfer:FileTransfer,
              public admob: AdMobFree,
              private fileOpener: FileOpener,
              private popoverCtrl: PopoverController,
              public navParams: NavParams,
              public dataProvider: DataProvider,
              public storage: Storage,
  ) {
    this.imgsSource = this.dataProvider.getImagesSources();

    const interConfig: AdMobFreeInterstitialConfig = {
      id: this.idInterADS
    };

    this.admob.interstitial.config(interConfig);

    this.getImgs();

    this.dataProvider.getData().then(res => {
      this.pics = res;
      console.log("pics", this.pics);
      this.dataInitialised = true;
      console.log("get it !!");
      this.prepareFavs();
    });
  }

  async getImgs() {
    let res = await this.dataProvider.getData();
    this.pics = res;
  }

  prepareFavs(){
    this.storage.get('favorites').then((res) => {
      console.log("getting favorites ...");
      if(res == null) this.favImages = [];
      else this.favImages = res;
      console.log("favImages", this.favImages);
      this.init();
    });
  }

  init(){
    this.isEmpty = false;
    let list = [];

    for(let item of this.favImages){
      let img = this.dataProvider.getImageById(this.pics,item);

      console.log(img);
      list.push({url: this.imgsSource + '/' + img.name + '.' + img.ext, image: img});
    }

    this.favList = list;
    if(this.favList.length == 0) {
      this.isEmpty = true;
    }

    console.log("favList", this.favList);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewPage');
  }

  view(image){
    if(image.ad == 1){
      this.admob.interstitial.prepare();
      this.admob.interstitial.show();
      this.admob.interstitial.prepare();

    }
    let pop = this.popoverCtrl.create('PhotoViewerPage',
      {image: image}
    );

    pop.present()
  }

  home(){
    this.navCtrl.setRoot(HomePage);
  }

  goToFavorites(){
    this.navCtrl.push(FavoritesPage, {data: this.pics})
  }

  goToSettings(){
    this.navCtrl.push(AppSettingsPage);
  }

  openImg(img, image){
    this.navCtrl.push(ViewerPage, {img : img, imgObject: image}).then(()=> console.log('Done'));
  }

}
