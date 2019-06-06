import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {RegisterPage} from '../pages/register/register' ;
import {LoginPage} from "../pages/login/login" ;
import { OrganizationProfilePage} from "../pages/organization-profile/organization-profile"
import { IrMethodsProvider } from '../providers/ir-methods/ir-methods';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { OnBoardingPage } from '../pages/on-boarding/on-boarding';
import { ForgotpasswordPage } from '../pages/forgotpassword/forgotpassword';

@NgModule({
  declarations: [
    MyApp,
    HomePage,RegisterPage,
    LoginPage,
    OrganizationProfilePage,
    OnBoardingPage,
    ForgotpasswordPage,
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicImageViewerModule,
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisterPage,
    LoginPage,
    OrganizationProfilePage,
    OnBoardingPage,
    ForgotpasswordPage,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    IrMethodsProvider
  ]
})
export class AppModule {}
