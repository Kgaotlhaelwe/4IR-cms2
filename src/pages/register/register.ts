import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { IrMethodsProvider } from '../../providers/ir-methods/ir-methods';
import { HomePage } from '../home/home';
import { OnBoardingPage } from '../on-boarding/on-boarding';
import { ModalController } from 'ionic-angular';
import { ForgotpasswordPage } from '../forgotpassword/forgotpassword';

import swal from "sweetalert";
import Swal from "sweetalert2";
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
  alertMessage;
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
          cssClass: "myAlert",
          title: 'Forgot your password?',
          message: "We just need your registered email address to reset your password.",
          inputs: [
            {
              name: 'email',
              type:'email',
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

                this.IRmethods.forgetPassword(data.email).then(()=>{
                  console.log("forgot password works");
                  const alert = this.alertCtrl.create({
                    cssClass: "myAlert",
                    title: 'Confirmation',
                    subTitle: "Please check your email to reset your password",
                    buttons: ['OK']
                  });
                  alert.present();
                }, Error => {
                  const alert = this.alertCtrl.create({
                    cssClass: "myAlert",
                    subTitle: Error.message,
                    buttons: ['OK'],
        
                  });
                  alert.present();
                  resolve()
                });
              }
            }
          ],
        });
        alert.present();
      }
      else if (this.email != null || this.email != undefined) {
        firebase.auth().sendPasswordResetEmail(this.email).then(() => {
          const alert = this.alertCtrl.create({
            cssClass: "myAlert",
            title: 'Password request Sent',
            subTitle: "We've sent you and email with a reset link, go to your email to recover your account.",
            buttons: ['OK'],

          });
          alert.present();
          resolve()
        }, Error => {
          const alert = this.alertCtrl.create({
            cssClass: "myAlert",
            subTitle: Error.message,
            buttons: ['OK'],

          });
          alert.present();
          resolve()
        });
      }
    }).catch((error) => {
      const alert = this.alertCtrl.create({
        cssClass: "myAlert",
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

  SignIn(email: string, password: string) {
    console.log(email, password)
    this.alertMessage = "Verifying details...";
    let b = window.innerHeight;

    Swal.fire({
      title: "Loading",
      html: this.alertMessage,
      // timer: 4000,
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    }).then(result => {});
    this.alertMessage = "Signing in...";
    if (this.email != "" && this.email != "") {
      this.IRmethods.SignIn(email, password).then((user: any) => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000
        });

        Toast.fire({
          type: "success",
          title: "Signed in successfully"
        });
        this.navCtrl.setRoot(HomePage)

      }).catch((error) => {
             if (
               error.message ==
               "There is no user record corresponding to this identifier. The user may have been deleted."
             ) {
               this.alertMessage =
                 "We do not have a record of this email address, please check your email address or sign up and get started...";
               Swal.hideLoading();
             } else if (
               error.message ==
               "The password is invalid or the user does not have a password."
             ) {
               this.alertMessage =
                 "Please ensure that your password is correct.";
               Swal.hideLoading();
             } else if (
               error.message == "The email address is badly formatted."
             ) {
               this.alertMessage =
                 "Please check if your email address is correct, something's not right.";
               Swal.hideLoading();
             } else {
               this.alertMessage = error.message;
             }

             swal(this.alertMessage);
             Swal.close();

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
    this.alertMessage = "Verifying details...";
    let b = window.innerHeight;

    Swal.fire({
      title: "Loading",
      html: this.alertMessage,
      // timer: 4000,
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    }).then(result => {});
    this.alertMessage = "Signing up...";
    if (this.signUpEmail != undefined && this.signUppassword != undefined) {
      this.IRmethods.signUp(this.signUpEmail, this.signUppassword).then(() => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 5000
        });
        Toast.fire({
          type: "success",
          title: "Please continue to finish signing up"
        });
        this.navCtrl.push(OnBoardingPage, { email: this.signUpEmail })
      }).catch((error) => {
        if (
          error.message ==
          "There is no user record corresponding to this identifier. The user may have been deleted."
        ) {
          this.alertMessage =
            "We do not have a record of this email address, please check your email address or sign up and get started...";
          Swal.hideLoading();
        } else if (
          error.message ==
          "The password is invalid or the user does not have a password."
        ) {
          this.alertMessage =
            "Please ensure that your password is correct.";
          Swal.hideLoading();
        } else if (
          error.message == "The email address is badly formatted."
        ) {
          this.alertMessage =
            "Please check if your email address is correct, something's not right.";
          Swal.hideLoading();
        } else {
          this.alertMessage = error.message;
        }
        swal(this.alertMessage);
        Swal.close();

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