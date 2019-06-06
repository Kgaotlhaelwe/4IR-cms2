import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController ,LoadingController} from 'ionic-angular';
import { IrMethodsProvider } from '../../providers/ir-methods/ir-methods';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public IRmethods: IrMethodsProvider,public alertCtrl: AlertController,public loadingCtrl:LoadingController) {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  goToSignIn(){
    this.navCtrl.push(RegisterPage)
  }

  
}
