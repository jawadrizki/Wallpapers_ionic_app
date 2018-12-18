import {Component, ChangeDetectorRef} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {HomePage} from "../home/home";
import {DataProvider} from "../../providers/data/data";
import {Storage} from "@ionic/storage";
import {ViewPage} from "../view/view";
import {ViewerPage} from "../viewer/viewer";

/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  images:any;
  imgsSource:string;
  data:any;
  list:any;
  isEmpty:boolean = false;


  constructor(public navCtrl: NavController,
              private popoverCtrl: PopoverController,
              public navParams: NavParams,
              public storage: Storage,
              public dataProvider: DataProvider
  ) {

    //this.data = this.navParams.get('data');
    this.getImgs().then(()=>{
      this.storage.get('favorites').then((res) => {
        if(res == null) this.images = [];
        else this.images = res;
        this.init()
      })
    });





  }

  async getImgs() {
    let res = await this.dataProvider.getData();
    this.data = res;
  }

  init(){
    let list = [];
    let sourceURL = this.dataProvider.getImagesSources();
    console.log(this.data)
    for(let item of this.images){
      let img = this.dataProvider.getImageById(this.data,item);
      console.log(img)
      list.push({url: sourceURL + '/' + img.name + '.' + img.ext, image: img});
    }
    this.list = list;
    if(this.list.length == 0) {
      this.isEmpty = true;

    }
    //console.log(this.list)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewPage');
  }

  view(image){
    let pop = this.popoverCtrl.create('PhotoViewerPage',
      {image: image}
    );

    pop.present()
  }

  home(){
    this.navCtrl.setRoot(ViewPage);
  }

  openImg(img, image){
    this.navCtrl.push(ViewerPage, {img : img, imgObject: image}).then(()=> console.log('Done'));
  }

}
