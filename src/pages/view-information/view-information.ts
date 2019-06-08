import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the ViewInformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-information',
  templateUrl: 'view-information.html',
})
export class ViewInformationPage {
  orgName;
  programBenefits;
  programCategory;
  eligibleCreteria;
  intro;
  promPhone;
  address;
  objectives;
  logo;
  img
  ObjectInfo = this.navParams.get("ObjectInfo")

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    console.log(this.ObjectInfo);
     this.orgName = this.ObjectInfo.orgName
     this.programBenefits = this.ObjectInfo.programBenefits
     this.programCategory = this.ObjectInfo.programCategory
     this.eligibleCreteria = this.ObjectInfo.eligibleCreteria
     this.intro = this.ObjectInfo.intro
     this.img = this.ObjectInfo.img
     this.logo = this.ObjectInfo.logo
     this.promPhone = this.ObjectInfo.promPhone
     this.address = this.ObjectInfo.address
     this.objectives = this.ObjectInfo.objectives
    console.log(this.img)
    console.log(this.logo)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewInformationPage');
  }

  signOut(){
    this.navCtrl.push(HomePage)
  }

}
