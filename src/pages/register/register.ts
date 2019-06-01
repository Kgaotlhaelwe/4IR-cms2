import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { IrMethodsProvider } from '../../providers/ir-methods/ir-methods';
import { HomePage } from '../home/home';
import { OnBoardingPage } from '../on-boarding/on-boarding';
declare var google;
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
  constructor(public IRmethods: IrMethodsProvider, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private _ngZone: NgZone) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');


    console.log(this.category);

  }
  
  Reg() {
    
    
    this.IRmethods.register(this.email, this.password,this.orgAddressObject.lat, this.orgAddressObject.lng, this.orgAddressObject.city,this.cell,this.category, this.orgName, this.description,  this.service, this.address).then(()=>{
       this.navCtrl.push(HomePage)
     })
  
}

  //this method will automatically set the address(long,lat,region) from the address the user enters
  

  //this method takes the address and converts it into long,lat and region
 


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
        subTitle: 'Please eneter all details ',
        buttons: ['OK']
      });
      alert.present();
    }

  
   }
}