import { Component } from '@angular/core';
import {
  IonicPage, NavController, NavParams, Platform, ViewController, LoadingController,
  ToastController, AlertController
} from 'ionic-angular';
import {FileTransferObject, FileTransfer} from "@ionic-native/file-transfer";
import {FileOpener} from "@ionic-native/file-opener";
import {Storage} from "@ionic/storage";
import {PhotoLibrary} from "@ionic-native/photo-library";
import {SocialSharing} from "@ionic-native/social-sharing";

/**
 * Generated class for the ViewerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var cordova: any;


@IonicPage()
@Component({
  selector: 'page-viewer',
  templateUrl: 'viewer.html',
})
export class ViewerPage {

  wallpaper:any;
  dataDirectory:string = '';
  storageDirectory:string = '';
  image:any;

  constructor(public navCtrl: NavController,
              public platform: Platform,
              public navParams: NavParams,
              public transfer: FileTransfer,
              public viewCtrl: ViewController,
              private fileOpener: FileOpener,
              public loadingCtrl: LoadingController,
              public storage: Storage,
              public photoLibrary: PhotoLibrary,
              private toastCtrl: ToastController,
              public sharing:SocialSharing,
              private alertCtrl: AlertController,
  ) {
    this.wallpaper = this.navParams.get('img');
    this.image = this.navParams.get('imgObject');
    console.log(this.image);
    console.log(this.wallpaper);

    this.platform.ready().then(() => {
      // make sure this is on a device, not an emulation (e.g. chrome tools device mode)
      if(!this.platform.is('cordova')) {
        return false;
      }

      if (this.platform.is('ios')) {
        this.storageDirectory = cordova.file.documentsDirectory;
      }
      else if(this.platform.is('android')) {
        this.storageDirectory = cordova.file.externalDataDirectory;
      }
      else {
        // exit otherwise, but you could add further types here e.g. Windows
        return false;
      }
      this.dataDirectory = cordova.file.applicationDirectory;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewerPage');
  }

  downloadImg(){
    const fileTransfer: FileTransferObject = this.transfer.create();

    let source = this.wallpaper;
    let imageObject = this.image;
    //let category = this.category;

    //let sourceDir = this.sourceURL + '/' + image.name + '.' + image.ext;
    let targetDir = this.storageDirectory + imageObject.id + '.' + imageObject.ext;
    let loading = this.loadingCtrl.create({
      content: 'Downloading ...'
    });
    loading.present();
    fileTransfer.download(source,targetDir).then((entry) => {
      //this.targetImage = entry.nativeURL;
      loading.dismiss();
      //alert(entry.nativeURL);
      this.photoLibrary.saveImage(entry.nativeURL, 'BTS Wallpapers').then(() => {
        console.log('File is saved');
        this.toastMsg("Image is saved in the Album < BTS Wallpapers >");
      });
    }, (error) => {
          alert('Error : ' + error);
    });
      /*this.fileOpener.open(entry.nativeURL, 'image/jpg').then(() => console.log('File is opened'));
    }, (error) => {
      alert('Error : ' + error);
    });*/
  }

  addToImgFavorite(){
    let fav = [];
    let loading = this.loadingCtrl.create({
      content: 'Please wait ...'
    });
    this.storage.get('favorites').then((res) => {
      if(res != null)
        fav = res;
      console.log("fav" , fav);
      loading.dismiss();
      if(fav.indexOf(this.image.id) == -1) {
        fav.push(this.image.id);
        this.toastMsg("Image is added to your favorite list");
      }else {
        this.presentConfirm();
      }
      this.storage.set('favorites', fav);
    });
  }

  shareIt(url){
    let loading = this.loadingCtrl.create({
      content: 'Please wait ...'
    });
    this.sharing.share("BTS Wallpaper", null, url, null).then(() => {loading.dismiss();} ).catch((err)=>{console.log(err)});
  }

  toastMsg(msg){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'This image is already in your favorite list. Do you want to remove it ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Remove',
          handler: () => {
            this.removeFromFavorite()
          }
        }
      ]
    });
    alert.present();
  }


  removeFromFavorite(){
    let l = [];
    this.storage.get('favorites').then((res) => {
      l = res;
      let index = l.indexOf(this.image.id);
      l.splice(index, 1);
      this.storage.set('favorites', l);
    });


  }
}
