import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {RegisterPage} from '../pages/register/register' ;
import {LoginPage} from "../pages/login/login" ;
import { IrMethodsProvider } from '../providers/ir-methods/ir-methods';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { OnBoardingPage } from '../pages/on-boarding/on-boarding';
import { ForgotpasswordPage } from '../pages/forgotpassword/forgotpassword';
import { TestsPage } from '../pages/tests/tests';
import { ViewInformationPage } from '../pages/view-information/view-information';

@NgModule({
  declarations: [
    MyApp,
    HomePage,RegisterPage,
    LoginPage,
    OnBoardingPage,
    ForgotpasswordPage,
    TestsPage,
    ViewInformationPage
    
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
    OnBoardingPage,
    ForgotpasswordPage,
    TestsPage,
    ViewInformationPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    IrMethodsProvider
  ]
})
export class AppModule {}
