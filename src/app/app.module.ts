import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {FileTransfer} from "@ionic-native/file-transfer";
import {File} from "@ionic-native/file";
import {FileOpener} from "@ionic-native/file-opener";
import { DataProvider } from '../providers/data/data';
import {HttpClient} from "@angular/common/http";
import {HttpClientModule} from "@angular/common/http";
import {HttpModule} from "@angular/http";
import {ViewPage} from "../pages/view/view";
import {PhotoViewerPage} from "../pages/photo-viewer/photo-viewer";
import {PhotoViewerPageModule} from "../pages/photo-viewer/photo-viewer.module";
import {PhotoViewer} from "@ionic-native/photo-viewer";
import {Network} from "@ionic-native/network";
import {IonicStorageModule} from "@ionic/storage";
import {FavoritesPage} from "../pages/favorites/favorites";
import {AdMobFree} from "@ionic-native/admob-free";
import {LocalNotifications} from "@ionic-native/local-notifications";
import {Consent} from "../../plugins/cordova-plugin-google-consent/www/consent-typescript-wrapper";
import {AppSettingsPage} from "../pages/app-settings/app-settings";
import {ViewerPage} from "../pages/viewer/viewer";
import {PhotoLibrary} from "@ionic-native/photo-library";
import {SocialSharing} from "@ionic-native/social-sharing";
import {AppVersion} from "@ionic-native/app-version";
import {AboutUsPage} from "../pages/about-us/about-us";



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ViewPage,
    FavoritesPage,
    AppSettingsPage,
    ViewerPage,
    AboutUsPage,
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    PhotoViewerPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ViewPage,
    PhotoViewerPage,
    FavoritesPage,
    AppSettingsPage,
    ViewerPage,
    AboutUsPage,
  ],
  providers: [
    HttpModule,
    HttpClientModule,
    StatusBar,
    PhotoLibrary,
    SplashScreen,
    SocialSharing,
    FileTransfer,
    File,
    FileOpener,
    PhotoViewer,
    Network,
    AdMobFree,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    LocalNotifications,
    Consent,
    AppVersion

  ]
})



export class AppModule {}
