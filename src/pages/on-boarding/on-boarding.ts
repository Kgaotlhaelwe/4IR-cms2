import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the OnBoardingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-on-boarding',
  templateUrl: 'on-boarding.html',
})
export class OnBoardingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OnBoardingPage');
  }
  moveToPage2(){
    var toSlide = document.getElementById("page1");
    toSlide.style.marginLeft = "-25%";
  }
  moveToPage3(){
    var toSlide = document.getElementById("page1");
    toSlide.style.marginLeft = "-50%";
  }
  moveToPage4(){
    var toSlide = document.getElementById("page1");
    toSlide.style.marginLeft = "-75%";
  }
  saveToDB(){
    
    const alert = this.alertCtrl.create({
      title: 'New Friend!',
      subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
      buttons: ['OK']
    });
    alert.present();
  }
}
