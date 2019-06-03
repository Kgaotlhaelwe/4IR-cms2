import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController ,LoadingController} from 'ionic-angular';
import { IrMethodsProvider } from '../../providers/ir-methods/ir-methods';
import { HomePage } from '../home/home';
import { OnBoardingPage } from '../on-boarding/on-boarding';
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
  
  service ;
  signUpEmail ;
  signUppassword ;
  HighEducationInstitution = ["Testing and Analysis", "Rapid prototype", "Consultation", "Reseach", "Applied Research"];

  Library = ["Research ", "Training "];
  constructor(public IRmethods: IrMethodsProvider, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private _ngZone: NgZone,public loadingCtrl:LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');


    console.log(this.category);

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
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Signing in...',
      duration: 4000
    });
    loading.present();
    this.IRmethods.loginx(email, password).then((user: any) => {
      console.log(user);
    }).catch((error) => {
      const alert = this.alertCtrl.create({
        subTitle: error.message,
        buttons: ['OK'],
        cssClass: 'myAlert',
      });
      loading.dismiss()
      alert.present();
    })
    this.navCtrl.push(HomePage)
  }


  signUp(){

    if(this.signUpEmail != undefined && this.signUppassword != undefined){
      this. IRmethods.signUp(this.signUpEmail ,this.signUppassword).then(()=>{
        console.log("sucess");
        this.navCtrl.push(OnBoardingPage, { email: this.signUpEmail })
        
      }).catch((error)=>{
      
        const alert = this.alertCtrl.create({
          title: '',
          subTitle: error.message ,
          buttons: ['OK']
        });
        alert.present();
        
      })

    }else {
      const alert = this.alertCtrl.create({
        title: '',
        subTitle: 'Please enter your email and password ',
        buttons: ['OK']
      });
      alert.present();
    }

  
   }

   forgotpassword(PlaceObject: object) {
    return new Promise((resolve, reject) => {
      if (this.email == null || this.email == undefined) {
        const alert = this.alertCtrl.create({
          cssClass: "myAlert",
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

                this.IRmethods.forgetPassword(data.email).then(()=>{
                  console.log("forgot password works");
                  const alert = this.alertCtrl.create({
                    cssClass: "myAlert",
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
            // cssClass: 'myAlert'
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
            text: 'ok',
            handler: data => {
              console.log('Cancel clicked');
            }
          }
        ],
      });
      alert.present();
    })
  }
}