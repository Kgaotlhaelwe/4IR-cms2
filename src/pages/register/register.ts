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

  forgotpassword(PlaceObject: object) {
    return new Promise((resolve, reject) => {
      if (this.email == null || this.email == undefined) {
        const alert = this.alertCtrl.create({
          // cssClass: "myAlert",
          title: 'Forgot your password?',
          message: "We just need your registered email address to reset your password.",

          // cssClass: 'myAlert',
          inputs: [
            {
              name: 'email',
              placeholder: 'Your email address'
            },
          ],
          buttons: [
            {
              text: 'Cancel',
              handler: data => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Send',
              handler: data => {
                console.log('Saved clicked');

                this.IRmethods.forgetPassword(data.email).then(() => {
                  console.log("forgot password works");
                  const alert = this.alertCtrl.create({
                    title: 'Confirmation',
                    subTitle: "Please check your email to reset your password",
                    buttons: ['OK']
                  });
                  alert.present();
                })
              }
            }
          ],
        });
        alert.present();
      }
      else if (this.email != null || this.email != undefined) {
        firebase.auth().sendPasswordResetEmail(this.email).then(() => {
          const alert = this.alertCtrl.create({
            // cssClass: "myAlert",
            title: 'Password request Sent',
            subTitle: "We've sent you and email with a reset link, go to your email to recover your account.",
            buttons: ['OK'],

          });
          alert.present();
          resolve()
        }, Error => {
          const alert = this.alertCtrl.create({
            // cssClass: "myAlert",
            subTitle: Error.message,
            buttons: ['OK'],
            // cssClass: 'myAlert'
          });
          alert.present();
          resolve()
        });
      }
    }).catch((error) => {
      const alert = this.alertCtrl.create({
        // cssClass: "myAlert",
        subTitle: error.message,
        buttons: [
          {
            text: 'OK',
            handler: data => {
              console.log('Cancel clicked');
            }
          }
        ],
      });
      alert.present();
    })
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

  SignIn(email, password) {
    console.log(email, password)
    if (this.email != undefined && this.password != undefined) {
      this.IRmethods.loginx(email, password).then((user: any) => {
        console.log(user);
        let loading = this.loadingCtrl.create({
          spinner: 'bubbles',
          content: 'Signing in...',
          duration: 4000
        });
        loading.present();
        this.navCtrl.push(HomePage)
      }).catch((error) => {
        const alert = this.alertCtrl.create({
          subTitle: error.message,
          buttons: ['OK'],
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


  signUp() {
    console.log(this.signUpEmail)
    if (this.signUpEmail != undefined && this.signUppassword != undefined) {
      this.IRmethods.signUp(this.signUpEmail, this.signUppassword).then(() => {
        console.log("sucess");
        let loading = this.loadingCtrl.create({
          spinner: 'bubbles',
          content: 'Please wait...',
          duration: 4000
        });
        loading.present();
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