import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { IrMethodsProvider } from '../../providers/ir-methods/ir-methods';
declare var google;
/**
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

  // first slider varables
  orgName;
  orgAdress;
  orgPhone;
  orgWebsite;
  orgDescription;
  category;

  ShowWifi: boolean = false;
  ShowChooseRange: boolean = false;
  // Second  slider varables
  wifi;
  offerWifi;
  chooseWifiRange;

  // hide services
  showheiServices: boolean = false;
  showLibaryServices: boolean = false;
  showinternetCafeServices: boolean = false;
  showlearningCenterServices: boolean = false;
  showMallServices: boolean = false;



  // email varaiable 
  email = this.navParams.get("email");

  // cat services 
  HeiServices;
  LibaryServices;
  internetCafeService;
  learningCenterServices;
  mallService;
  checkAddress
  // General varable
  orgAddressObject;
  catService = new Array();

  track ;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private _ngZone: NgZone, public IRmethods: IrMethodsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OnBoardingPage');
    console.log(this.email);

  }
  moveToPage2() {
    console.log(this.orgName);

    console.log(this.orgPhone);
    console.log(this.orgWebsite);
    console.log(this.orgDescription);

    if (this.orgName == undefined && this.orgAdress == undefined && this.orgPhone == undefined && this.orgWebsite == undefined && this.orgDescription == undefined) {
      this.alert("Enter all details ")
    } else if (this.orgName == undefined) {
      this.alert("Enter organisation Name ")
    } else if (this.orgAdress == undefined) {
      this.alert("Enter Address  ")
    } else if (this.orgPhone == undefined) {
      this.alert("Enter Phone numbers  ")
    } else if (this.orgDescription == undefined) {
      this.alert("Enter Phone numbers  ")

    } else {

    var toSlide = document.getElementById("page1");
    toSlide.style.marginLeft = "-25%";

    }


  }
  moveToPage3() {


    // if (this.wifi == undefined) {
    //   this.wifi = ""
    // } if (this.chooseWifiRange == undefined) {
    //   this.chooseWifiRange = ""
    // }

    // if (this.offerWifi != undefined) {
    var toSlide = document.getElementById("page1");
    toSlide.style.marginLeft = "-50%";
    //     } else {
    //       this.alert("enter the details")
    // }

  }


  moveToPage4() {
    var toSlide = document.getElementById("page1");
    toSlide.style.marginLeft = "-75%";
  }

  backToPage3() {
    var toSlide = document.getElementById("page1");
    toSlide.style.marginLeft = "-50%";
  }
  backToPage2() {
    var toSlide = document.getElementById("page1");
    toSlide.style.marginLeft = "-25%";
  }
  backToPage1() {
    var toSlide = document.getElementById("page1");
    toSlide.style.marginLeft = "0%";
  }
  saveToDB() {
    console.log(this.orgName);

    console.log(this.orgPhone);
    console.log(this.orgWebsite);
    console.log(this.orgDescription);
    console.log(this.orgAddressObject.lat, this.orgAddressObject.lng, this.orgAddressObject.city);
    console.log(this.offerWifi);
    console.log(this.wifi);
    console.log(this.chooseWifiRange);
    console.log(this.category);
    console.log(this.catService);
    console.log(this.email);

    this.IRmethods.addOrganisation(" ", this.orgAddressObject.lat, this.orgAddressObject.lng, this.orgAddressObject.city, this.orgPhone, this.category, this.orgName, this.orgDescription, this.catService, this.orgAdress, this.offerWifi, this.wifi, this.chooseWifiRange).then(() => {
      console.log("added successfully");

    })
  }

  checkWifi() {
    console.log("testing");
    console.log(this.offerWifi);

    if ("Yes" == this.offerWifi) {
      this.ShowWifi = true;
    } else {
      this.ShowWifi = false;
    }

  }

  checkWifipayment() {
    if (this.wifi == "Yes") {
      this.ShowChooseRange = true
    } else {
      this.ShowChooseRange = false
    }
  }

  showServices() {
    console.log(this.category);
    if (this.category == "High Education Institution") {
      this.showheiServices = true;

      this.showLibaryServices = false;
      this.showinternetCafeServices = false;
      this.showlearningCenterServices = false;
      this.showMallServices = false;

      this.catService = this.HeiServices;

      console.log(this.catService);


    } else if (this.category == "Library") {
      this.showLibaryServices = true;
      this.showheiServices = false;
      this.showheiServices = false;

      this.showinternetCafeServices = false;
      this.showlearningCenterServices = false;
      this.showMallServices = false;
    } else if (this.category == "InterCafe") {
      this.showinternetCafeServices = true;
      this.showLibaryServices = false;
      this.showheiServices = false;
      this.showheiServices = false;
      this.showlearningCenterServices = false;
      this.showMallServices = false;

    } else if (this.category == "Learning Center") {
      this.showlearningCenterServices = true;
      this.showinternetCafeServices = false;
      this.showLibaryServices = false;
      this.showheiServices = false;
      this.showheiServices = false;

      this.showMallServices = false;

  }else if (this.category == "Mall"){
    this.showMallServices = true;
    this.showlearningCenterServices = false;
      this.showinternetCafeServices = false;
      this.showLibaryServices = false;
      this.showheiServices = false;
      this.showheiServices = false;

    }else if (this.category == "Coffee Shop"){

    }


  }

  alert(message) {
    const alert = this.alertCtrl.create({
      title: '',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }


  setAddress(event) {
    this.getcoo(this.orgAdress).then((data: any) => {
      this.orgAddressObject = data;
      console.log(this.orgAddressObject);
    }, Error => {
      this. checkAddress = 0 ;
      const alert = this.alertCtrl.create({
        
        subTitle: 'The address you have entered is invalid, please enter a valid address',
        buttons: [
          {
            text: 'OK',
            handler: data => {
              this.orgAdress = ""
            }
          },
        ]
      });
      alert.present();
    })
  }



  hei() {
    this.catService = this.HeiServices;
    console.log(this.catService);
  }

  libary() {
    this.catService = this.LibaryServices
    console.log(this.catService);
  }
  internet() {
    this.catService = this.internetCafeService;
    console.log(this.catService);

  }
  getcoo(address) {
    return new Promise((accpt, rej) => {
      this._ngZone.run(() => {
        let geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: address }, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            var arr = results[0].address_components;
            var arr2 = arr[3];
            this.latitude = results[0].geometry.location.lat();
            this.longitude = results[0].geometry.location.lng();
            let position = {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
              city: arr2.long_name
            };
            accpt(position);
          }
          else {
            rej('')
          }
        });
      });
    });
  }
  testCheckboxResult1;
  testCheckboxOpen1;
  HEIservices(){
    let alert = this.alertCtrl.create();
    alert.setTitle('Which planets have you visited?');

    alert.addInput({
      type: 'checkbox',
      label: 'Testing & Analystical',
      value: 'Testing & Analystical',
      checked: true
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Rapid prototype',
      value: 'Rapid prototype'
    });
    alert.addInput({
      type: 'checkbox',
      label: 'Consultation',
      value: 'Consultation'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Research',
      value: 'Research'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        console.log('Checkbox data:', data);
        this.testCheckboxOpen1 = false;
        this.testCheckboxResult1 = data;
        this.catService =data 
        
      console.log(data);
      }
      
    });
    alert.present();
  }
  testCheckboxResult2;
  testCheckboxOpen2;
  LibraryServices(){
    let alert = this.alertCtrl.create();
    alert.setTitle('Which planets have you visited?');

    alert.addInput({
      type: 'checkbox',
      label: 'Training',
      value: 'Training',
      checked: true
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Research',
      value: 'Research'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        console.log('Checkbox data:', data);
        this.testCheckboxOpen2 = false;
        this.testCheckboxResult2 = data;
        this.catService =data 
        
      console.log(data);
      }
      
    });
    alert.present();
  }
  testCheckboxResult3;
  testCheckboxOpen3;
  internetCafe(){
    let alert = this.alertCtrl.create();
    alert.setTitle('Which planets have you visited?');

    alert.addInput({
      type: 'checkbox',
      label: 'Internet',
      value: 'Internet',
      checked: true
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Printing',
      value: 'Printing'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'fax',
      value: 'fax'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        console.log('Checkbox data:', data);
        this.testCheckboxOpen3 = false;
        this.testCheckboxResult3 = data;
        this.catService =data 
        
      console.log(data);
      }
      
    });
    alert.present();
  }

  testCheckboxResult4;
  testCheckboxOpen4;


  learningCenter(){
    let alert = this.alertCtrl.create();
    alert.setTitle('Which planets have you visited?');

    alert.addInput({
      type: 'checkbox',
      label: 'Skill Development',
      value: 'Skill Development',
      checked: true
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Training',
      value: 'Training'
    });
    alert.addInput({
      type: 'checkbox',
      label: 'Incubation',
      value: 'Incubation'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        console.log('Checkbox data:', data);
        this.testCheckboxOpen4 = false;
        this.testCheckboxResult4 = data;
        this.catService =data 
        
      console.log(data);
      }
      
    });
    alert.present();
  }
  testCheckboxResult5;
  testCheckboxOpen5;
  mall(){
    let alert = this.alertCtrl.create();
    alert.setTitle('Which planets have you visited?');

    alert.addInput({
      type: 'checkbox',
      label: 'Training',
      value: 'Training',
      checked: true
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Internet',
      value: 'Internet'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        console.log('Checkbox data:', data);
        this.testCheckboxOpen5 = false;
        this.testCheckboxResult5 = data;
        
      console.log(data);
      }
      
    });
    alert.present();
  }

 


}
