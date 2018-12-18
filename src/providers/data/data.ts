import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/RX';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {


  dataSource:string = 'http://poissontata.com/apps/wallpapers/bts/data.php';
  imagesSource:string = 'http://poissontata.com/apps/wallpapers/bts/data/';


  //dataSource:string = 'data.json';
  //imagesSource:string = 'assets/imgs/sources/';
  categories:any;

  constructor(public http: HttpClient) {
    console.log('Hello DataProvider Provider');
  }

  getData(){
    return new Promise((resolve, reject) => {
      this.http
        .get(this.dataSource)
        .subscribe(
          (data) => {
           resolve(data)
          },
          (error) => {
            reject(error)
          });
    })
  }

  getImagesSources(){
    return this.imagesSource;
  }

  getImageById(data,id){
    //let data = await this.getData();
    let item = null;
    for(let img of data){
        if(img.id == id) {
          item = img;
        }
    }
    return item;
  }

}
