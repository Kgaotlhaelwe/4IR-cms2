import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { IrMethodsProvider } from '../../providers/ir-methods/ir-methods';
import { HomePage } from '../home/home';
import { OnBoardingPage } from '../on-boarding/on-boarding';
import { ModalController } from 'ionic-angular';
import { ForgotpasswordPage } from '../forgotpassword/forgotpassword';
declare var google;
declare var firebase;
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  //variables
  category;
  password;
  email;
  orgName;
  address;
  orgAddressObject;
  cell;
  image;
  description;
  items = new Array();
  serviceArray = new Array();

  service;
  signUpEmail;
  signUppassword;
  HighEducationInstitution = ["Testing and Analysis", "Rapid prototype", "Consultation", "Reseach", "Applied Research"];

  Library = ["Research ", "Training "];
  constructor(public IRmethods: IrMethodsProvider, public alertCtrl: AlertController, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, private _ngZone: NgZone, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');


    console.log(this.category);

  }


  presentModal() {
    const modal = this.modalCtrl.create(ForgotpasswordPage);
    modal.present();
  }

  forgotpassword(){
    this.navCtrl.push(ForgotpasswordPage)
  }


  selectCategory() {
    console.log(this.category);


  }


  selectedServices(item) {
    console.log(item);
    this.serviceArray.push(item);
    console.log(this.serviceArray);

  }

  getItems(ev: any) {
    // Reset items back to all of the items

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  SignIn(email: string, password: string) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Signing in...',
      duration: 4000
    });
    loading.present();
    console.log(email, password)
    if (this.signUpEmail != "" && this.signUppassword != "") {
      this.IRmethods.SignIn(email, password).then((user: any) => {
        loading.dismiss()
        this.navCtrl.setRoot(HomePage)

      }).catch((error) => {
        const alert = this.alertCtrl.create({
          cssClass: "myAlert",
          // title: "No Password",
          subTitle: error.message,
          buttons: ['OK'],
          // cssClass: 'myAlert',
        });

        alert.present();
      })
    } else {
      const alert = this.alertCtrl.create({
        cssClass: "myAlert",
        title: '',
        subTitle: 'Please enter your email and password ',
        buttons: ['OK']
      });
      alert.present();
    }
  }



  signUp() {
    // let loading = this.loadingCtrl.create({
    //   spinner: 'bubbles',
    //   content: 'Please wait...',
    //   duration: 4000
    // });
    // loading.present();
    if (this.signUpEmail != undefined && this.signUppassword != undefined) {
      this.IRmethods.signUp(this.signUpEmail, this.signUppassword).then(() => {
        console.log("sucess");
        this.navCtrl.push(OnBoardingPage, { email: this.signUpEmail })
      }).catch((error) => {
        const alert = this.alertCtrl.create({
          title: '',
          subTitle: error.message,
          buttons: ['OK']
        });
        alert.present();
      })
    } else {
      const alert = this.alertCtrl.create({
        title: '',
        subTitle: 'Please enter your email and password ',
        buttons: ['OK']
      });
      alert.present();
    }
  }



 
  
}