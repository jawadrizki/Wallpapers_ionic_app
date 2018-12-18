import {Component, ViewChild} from '@angular/core';
import {Platform, Nav} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { FavoritesPage } from '../pages/favorites/favorites';
import {Storage} from "@ionic/storage";
import {AdMobFree, AdMobFreeBannerConfig} from "@ionic-native/admob-free";
import {ViewPage} from "../pages/view/view";
import {Consent} from "../../plugins/cordova-plugin-google-consent/www/consent-typescript-wrapper";
import {AboutUsPage} from "../pages/about-us/about-us";

declare var cordova:any;
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = HomePage;
  pages: Array<{name: string, component: any, icon: string}>;

  idBannerAds:string = 'ca-app-pub-3576496969361263/9677770970';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public storage:Storage,
              private admobFree: AdMobFree, private consent:Consent
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.consent.verifyConsent(["pub-3576496969361263"], "https://1drv.ms/w/s!AgAVDfqZTM5rfy46nSpFuUYsEHw",	false, false)
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });

      this.storage.get('isFirstTime').then((res) => {
        if(res != true){
          cordova.plugins.notification.local.schedule({
            title: 'BTS HD Wallpapers',
            text: 'Check for New HD Wallpapers for BTS',
            trigger: { every: 'week' }
          });
          this.storage.set('isFirstTime', true)
        }
      });


      const bannerConfig: AdMobFreeBannerConfig = {
        // add your config here
        // for the sake of this example we will just use the test config
        id: this.idBannerAds,
        autoShow: true
      };
      this.admobFree.banner.config(bannerConfig);

      this.admobFree.banner.prepare()
        .then(() => {
          // banner Ad is ready
          // if we set autoShow to false, then we will need to call the show method here
          this.admobFree.banner.show()
        })
        .catch(e => console.log(e));
      //this.admobFree.banner.remove()

      let fav = false;
      this.storage.get('favorites').then((res) => {
        if(res != null) fav = true;
        if(!fav) this.storage.set('favorites', []);
      });


      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.pages = [
      { name: 'Last Updates', component: HomePage, icon: 'flame'},
      { name: 'Wallpapers', component: ViewPage , icon: 'photos'},
      { name: 'Favorites', component: FavoritesPage, icon: 'bookmark'},
      { name: 'About', component: AboutUsPage, icon: 'information-circle'},

    ];
  }

  openPage(page){
    this.nav.setRoot(page.component);
  }
}

