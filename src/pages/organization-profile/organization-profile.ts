import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IrMethodsProvider } from '../../providers/ir-methods/ir-methods';
declare var firebase;
/**
 * Generated class for the OrganizationProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-organization-profile',
  templateUrl: 'organization-profile.html',
})
export class OrganizationProfilePage {
  profileArr = new Array();
  constructor(public navCtrl: NavController, public navParams: NavParams, public IrMethodsProvider: IrMethodsProvider) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrganizationProfilePage');

   
  }

}
