import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TestsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tests',
  templateUrl: 'tests.html',
})
export class TestsPage {
  showProgramIntroduction;
  showObjective;
  showWebsiteHintInfo;
  showPhoneHint;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestsPage');
  }
ProgramIntroductionHint() {
    this.showProgramIntroduction = true;
  }

  hideProgramIntroductionHint() {
    console.log("l");

    this.showProgramIntroduction = false
  }

  ProgramObjectiveHint() {
    this.showObjective = true;
  }

  hideObjectiveHint() {
    this.showObjective = false
  }
  websiteHintInfo() {
    this.showWebsiteHintInfo = true;
  }

  hidewebsiteHintInfo() {
    this.showWebsiteHintInfo = false;
  }


  phoneHint(){
    this.showPhoneHint = true ;
  }

  hidephoneHint(){
    this.showPhoneHint = false ;
  }

}
