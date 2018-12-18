import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, AlertController, ViewController} from 'ionic-angular';
import {FileOpener} from "@ionic-native/file-opener";
import {FileTransfer, FileTransferObject} from "@ionic-native/file-transfer";
import {PhotoViewer} from "@ionic-native/photo-viewer";
import {Storage} from "@ionic/storage";
import {DataProvider} from "../../providers/data/data";

/**
 * Generated class for the PhotoViewerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-photo-viewer',
  templateUrl: 'photo-viewer.html',
})
export class PhotoViewerPage {

  image: any;
  category: any;
  dataDirectory:string = '';
  storageDirectory:string = '';
  sourceURL:string;
  src:string;
  isFavorite:boolean;

  targetImage:string = null;



  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform,
              public transfer:FileTransfer,
              public viewCtrl: ViewController,
              private fileOpener: FileOpener,
              public storage:Storage,
              public alertCtrl: AlertController,
              public dataProvider: DataProvider,
              public photoViewer: PhotoViewer) {

    this.image = this.navParams.get('image');
    this.sourceURL = this.dataProvider.getImagesSources();

    this.src = this.sourceURL  + this.image.name + '.' + this.image.ext;


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

    let favorites = [];
    this.storage.get('favorites').then((res) => {
      favorites = res;
      if(favorites.indexOf(this.image.id) > -1) this.isFavorite = true;
      else this.isFavorite = false;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotoViewerPage');
  }

  setAsWallpaper(){
  const fileTransfer: FileTransferObject = this.transfer.create();

  let image = this.image;
  let category = this.category;

  let sourceDir = this.sourceURL + '/' + image.name + '.' + image.ext;
  let targetDir = this.storageDirectory + image.id + '.' + image.ext;

  fileTransfer.download(sourceDir,targetDir).then((entry) => {
    //this.targetImage = entry.nativeURL;
    this.fileOpener.open(entry.nativeURL, 'image/jpg').then(() => console.log('File is opened'));
    }, (error) => {
      alert('Error : ' + error);
  });
  }

  open(){
    this.photoViewer.show(this.sourceURL + '/' + this.image.name + '.' + this.image.ext);
  }


  addToFavorite(){
    let fav = [];
    this.storage.get('favorites').then((res) => {
      if(res != null)
        fav = res;
      console.log(fav);

      if(fav.indexOf(this.image.id) == -1)
        fav.push(this.image.id);
      this.storage.set('favorites', fav);
      console.log(fav);
    });
    this.viewCtrl.dismiss()
  }

  removeFromFavorite(){
    let l = [];
    this.storage.get('favorites').then((res) => {
      l = res;
      let index = l.indexOf(this.image.id);
      l.splice(index, 1);
      this.storage.set('favorites', l);

    })
    this.viewCtrl.dismiss()


  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Do you want to remove it from your favorites ?',
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


}
