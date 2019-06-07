import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IrMethodsProvider } from '../providers/ir-methods/ir-methods';
import { HomePage } from '../pages/home/home';

import {RegisterPage} from "../pages/register/register"
import { LoginPage } from '../pages/login/login';
import { OnBoardingPage } from '../pages/on-boarding/on-boarding';
import { ForgotpasswordPage } from '../pages/forgotpassword/forgotpassword';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
<<<<<<< HEAD
  rootPage :any   ; 
=======
  rootPage :any  =  RegisterPage; 
>>>>>>> d94355b38426e4ae4c45c5c20199117bf0d02844

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public IRmethods: IrMethodsProvider) {
    platform.ready().then(() => {
      IRmethods.checkstate().then((data: any) => {
        if (data == 1) {
          this.rootPage =HomePage
        }
        else {
          this.rootPage = RegisterPage
        }
      })
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      
      splashScreen.hide();
    });
  }
}

