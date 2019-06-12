import { Component } from '@angular/core';
import { IrMethodsProvider } from '../../providers/ir-methods/ir-methods';
import { HomePage } from '../home/home';
import { OnBoardingPage } from '../on-boarding/on-boarding';
import { ModalController } from 'ionic-angular';
declare var google;
import { IonicPage, NavController, NavParams, AlertController ,LoadingController} from 'ionic-angular';
declare var firebase;
/**
 * Generated class for the ForgotpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html',
})
export class ForgotpasswordPage {
  email
  constructor(public IRmethods: IrMethodsProvider, public alertCtrl: AlertController,public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams,public loadingCtrl:LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotpasswordPage');
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



  goBack(){
    this.navCtrl.pop();
  }
}
