import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { IrMethodsProvider } from '../../providers/ir-methods/ir-methods';
import { HomePage } from "../../pages/home/home";
import { LoginPage } from '../login/login';
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
  showCoffeeShopServices:boolean = false ;
  websiteValidation  ;
  applicationLink ;
  promPhone ;
  twitter ;
  facebook ;

  heiServices = [{ title: "Testing & Analystical", description: " Services include material testing and behaviour analysis, as well as quality tests. These can be R&D or routine jobs according to existing standards or client's specifications, using readily available high-end software and equipment." },


  { title: "Rapid Prototyping and Manufacturing", description: 'model with regard to the indicated functional aspects of a product. The manufacturing is not limited to batch/pilot manufacturing of models, but can include either contract machining or manufacturing, based on the clients drawings or specifications' },
  { title: "Consultation, Technology Audit and Feasibility Study", description: 'Consultation includes search and technology brokerage services, finding the know-how as a diagnostic service, assessment or consultancy. This is usually the first part of any project to identify the potential for improvement and the required interventions. This involves the searching and sourcing of technology from outside the Universities of Technology, generally from firms, engineering consultants; brokering as well as possibly managing technology transfers to SME' },
  { title: "Process or Product Improvement", description: 'Productivity, workflow and quality all improve production facilities and products by applying standard procedures and methods. In many cases, this would also involve testing and analytical services to make the product conform to required specifications on new market demands and regulations' },
  { title: "Applied Development, Engineering and Design", description: 'This involves the application of engineering processes from CAD to CAM now CA ,including scaled production based on the know-how from Technology Stations, needing professional engineering and design skills as well as identification and sourcing of technology or equipment. These services lead to demand driven projects that can be funded by various funding Agencies' },

  ]
  libraryService = [{ title: "Research", description: " involves the step-by-step process used to gather information in order to write a paper, create a presentation, or complete a project. ... They describe, analyze, and/or evaluate information found in primary sources" },
  { title: "Training", description: '"The latest information and communication technology (ICT) developments, including data curation, digital preservation, data management planning, institutional repositories, social media, online learning, publishing, e-books and mobile technology offer wonderful new opportunities in the delivery of information services and the way libraries are managed. Librarianship forms the basis of specialization and diverse career opportunities including document management, knowledge management, childrens librarianship, research librarianship and electronic resources management"' }


  ]

  learningCenterService = [{title:"Skill Development" , description:" is the process of (1) identifying your skill gaps, and (2) developing and honing these skills. It is important because your skills determine your ability to execute your plans with success. ... In goal achievement, your skills are your tools."}
                           , {title:"Training" , description:"Training is a program that helps people learn specific knowledge or skills to improve performance in their current roles. Development is more expansive and focuses on people growth and future performance, rather than an immediate job role"} ,
                           {title: "EnterpreneurShip Programme" , description: "The Entrepreneurship Development Programme is aimed at creating a conducive environment for young entrepreneurs to access relevant entrepreneurship skills, knowledge, values and attitudes for their businesses."}
]

mallServices = [{title:"Internet " , description:"Wanting to share your Mall of Africa experience with your friends and family on social media? Needing to send a business email in the midst of shopping? Not a problem! You can surf the internet for free wherever you are at Mall of Africa."},
                {title:"Training " , description:"Training is a program that helps people learn specific knowledge or skills to improve performance in their current roles. Development is more expansive and focuses on people growth and future performance, rather than an immediate job role"}

]

internetCafeServices = [{title:"Internet" , description:"s a place that offers customers hi-speed internet access, other computer services and variety of PC games. It deals with internet time that a customer buys and it can be sold per hour or minute and sometimes longer"},
{title:" Printing" , description:'Managed print services (MPS) is the provision and oversight of business document output needs by an external service provider. ... The next step is typically a partial or complete replacement of existing hardware, including printers, faxes, scanners, photocopiers and multifunction (MFP) devices.'}
,{title:"fax" , description:"an exact copy of a document made by electronic scanning and transmitted as data by telecommunications links."}

]

coffeeshopServices = [{title:"Internet" , description:"Offering internet to customers"}]
  // email varaiable 
  email = this.navParams.get("email");
//EnterpreneurShip Programme
  // cat services 
  HeiServices;
  LibaryServices;
  internetCafeService;
  learningCenterServices;
  mallService;
  checkAddress
  // General varable
  orgAddressObject;
  catService = []

  Heitrack;

  progressBar = 25

  contactValidation;

  program ;
  showRegistionOrgs :boolean = false ;
  showRegistionProgs :boolean =false  ;

  // program variables 
  promName ;
  openApplicationDate;
  closeApplicationDate ;
  programStartDate ;
  programCloseDate ;

  Programcategory ;
  ProgramIntroduction ;
  objectives ;
  targetAudience ;
  programDescription ;

  programService ;
  programBenefits ;
  programAdditionalBenefits ;
  EligibleCriteria ;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private _ngZone: NgZone, public IRmethods: IrMethodsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OnBoardingPage');
    console.log(this.email);
    console.log(this.heiServices[0].title);

    this. is_urlValidation("www.youtube.com") ;


  }
  moveToPage2() {
    
    this.phonenumberValidatin() ;

    this.is_urlValidation(this.orgWebsite) ;
    if (this.orgName == undefined && this.orgAdress == undefined && this.orgPhone == undefined && this.orgWebsite == undefined && this.orgDescription == undefined) {
      this.alert("Please complete all details ")
    } else if (this.orgName == undefined) {
      this.alert("Enter organisation Name ")
    } else if (this.orgAdress == undefined) {
      this.alert("Enter Address  ")
    }else if(this.contactValidation == 1){
      this.alert("The phone numbers you have entered is invalid, please enter a valid phone numbers  ")
    }else if ( this.websiteValidation ==1){
      this.alert("The website address you have entered is invalid, please enter a valid website address ")
    }else if (this.checkAddress == 1) {
      this.alert("The address you have entered is invalid, please enter a valid address ")
    }
    else if (this.orgPhone == undefined) {
      this.alert("Enter Phone numbers  ")
    } else if (this.orgDescription == undefined) {
      this.alert("Enter Phone numbers  ")

    } else {

      var toSlide = document.getElementById("page1");
      toSlide.style.marginLeft = "-25%";
      this. progressBar = this.progressBar + 25 

    }



    

  }
  moveToPage3() {




    if (this.offerWifi == "No") {
      if (this.wifi == undefined) {
        this.wifi = "No"
      } if (this.chooseWifiRange == undefined) {
        this.chooseWifiRange = "No"
      }

    }

    if (this.offerWifi != undefined) {
      if (this.wifi != undefined && this.chooseWifiRange != undefined) {
        var toSlide = document.getElementById("page1");
        toSlide.style.marginLeft = "-50%";
        this. progressBar = this.progressBar + 25 
      } else {
        this.alert("Please complete all details")
      }

    }

    else {

      this.alert("Please complete all details")
    }



  }


  moveToPage4() {

    if (this.category != undefined && this.catService.length !=  0){
      console.log(this.catService);
      

      var toSlide = document.getElementById("page1");
      toSlide.style.marginLeft = "-75%";
      this. progressBar = this.progressBar + 25
    }else {
      this.alert("Complete all the Details ")
    }
    
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

    this.IRmethods.addOrganisation(this.email, this.orgAddressObject.lat, this.orgAddressObject.lng, this.orgAddressObject.city, this.orgPhone, this.category, this.orgName, this.orgDescription, this.catService, this.orgAdress, this.offerWifi, this.wifi, this.chooseWifiRange, this.orgWebsite).then(() => {
      console.log("added successfully");
      this.navCtrl.push(HomePage);

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
    if (this.category == "Higher Education Institution") {
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

    } else if (this.category == "Mall") {
      this.showMallServices = true;
      this.showlearningCenterServices = false;
      this.showinternetCafeServices = false;
      this.showLibaryServices = false;
      this.showheiServices = false;
      this.showheiServices = false;

    } else if (this.category == "Coffee Shop") {
      this.showCoffeeShopServices =true 
      this.showlearningCenterServices = false;
      this.showinternetCafeServices = false;
      this.showLibaryServices = false;
      this.showheiServices = false;
      this.showheiServices = false;
      this.showMallServices = false;

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
      this.checkAddress = 0

      console.log(this.orgAddressObject);
    }, Error => {
      this.checkAddress = 1;

      console.log(this.checkAddress);

      // const alert = this.alertCtrl.create({

      //   subTitle: 'The address you have entered is invalid, please enter a valid address',
      //   buttons: [
      //     {
      //       text: 'OK',
      //       handler: data => {
      //         this.orgAdress = ""
      //       }
      //     },
      //   ]
      // })
      // alert.present();
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
  HEIservices() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Choose your Services');

    alert.addInput({
      type: 'checkbox',
      label: 'Testing & Analystical',
      value: 'Testing & Analystical',
      checked: true
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Rapid Prototyping and Manufacturing',
      value: 'Rapid Prototyping and Manufacturing'
    });
    alert.addInput({
      type: 'checkbox',
      label: 'Consultation, Technology Audit and Feasibility Study',
      value: 'Consultation, Technology Audit and Feasibility Study'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Applied Development, Engineering and Design',
      value: 'Applied Development, Engineering and Design'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: (data) => {
        console.log('Checkbox data:', data);
       // this.testCheckboxOpen1 = false;
     //   this.testCheckboxResult1 = data;

        var temArray = []
        for (let index = 0; index < data.length; index++) {

          if (data[index] == "Testing & Analystical") {
            console.log(0);
            temArray.push(this.heiServices[0])

          } else if (data[index] == "Rapid Prototyping and Manufacturing") {

            temArray.push(this.heiServices[1])

          } else if (data[index] == "Consultation, Technology Audit and Feasibility Study") {
            console.log(3);

            temArray.push(this.heiServices[2])

          } else if (data[index] == "Applied Development, Engineering and Design") {
            console.log(4);

            temArray.push(this.heiServices[3])

          }

        }

        //console.log(temArray);

        this.catService = temArray;
        console.log(this.catService);
        console.log(this.catService);
      }

    });
    alert.present();
  }
  testCheckboxResult2;
  testCheckboxOpen2;
  LibraryServices() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Choose your Services');

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
        var temArray = []
        for (let index = 0; index < data.length; index++) {

          if (data[index] == "Training") {
            console.log(0);
            temArray.push(this.libraryService[1])

          } else if (data[index] == "Research") {

            temArray.push(this.libraryService[0])
          }

        }

        this.catService =temArray ;
        console.log( this.catService =temArray);
        
      }

    });
    alert.present();
  }
  testCheckboxResult3;
  testCheckboxOpen3;


  internetCafe() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Choose your Services');

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
        var temArray = []
        for (let index = 0; index < data.length; index++) {

          if (data[index] == "Internet") {
            console.log(0);
            temArray.push(this.internetCafeServices[0])

          } else if (data[index] == "Printing") {

            temArray.push(this.learningCenterService[1])
          }else if (data[index] == "fax"){
            temArray.push(this.internetCafeServices[2])

          }

        }

        this.catService =temArray ;
        console.log( this.catService =temArray);
      }

    });
    alert.present();
  }

  testCheckboxResult4;
  testCheckboxOpen4;


  learningCenter() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Choose your Services');

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
      label: 'EnterpreneurShip Programme',
      value: 'EnterpreneurShip Programme'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        console.log('Checkbox data:', data);
        var temArray = []
        for (let index = 0; index < data.length; index++) {

          if (data[index] == "Skill Development") {
            console.log(0);
            temArray.push(this.learningCenterService[0])

          } else if (data[index] == "Training") {

            temArray.push(this.learningCenterService[1])
          }else if (data[index] == "EnterpreneurShip Programme"){
            temArray.push(this.learningCenterService[2])

          }

        }

        this.catService =temArray ;
        console.log( this.catService =temArray);
        
      }

    });
    alert.present();
  }
  testCheckboxResult5;
  testCheckboxOpen5;
  mall() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Choose your Services');

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
        var temArray = []
        for (let index = 0; index < data.length; index++) {

          if (data[index] == "Training") {
            console.log(0);
            temArray.push(this.mallServices[0])

          } else if (data[index] == "Internet") {

            temArray.push(this.mallServices[1])
          }

        }

        this.catService =temArray ;
        console.log( this.catService =temArray);
      }

    });
    alert.present();
  }



  Coffeeshops() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Choose your Services');

  

    alert.addInput({
      type: 'checkbox',
      label: 'Internet',
      value: 'Internet'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        var temArray = []
        for (let index = 0; index < data.length; index++) {

          if (data[index] == "Internet") {
            console.log(0);
            temArray.push(this.coffeeshopServices[0])

          } 

        }

        this.catService =temArray ;
        console.log( this.catService =temArray);
      }

    });
    alert.present();
  }




  phonenumberValidatin() {

    if (this.orgPhone == undefined) {

    } else {
      var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;


      if (this.orgPhone.match(phoneno)) {
        console.log(this.orgPhone.match(phoneno));
        this.contactValidation = 0;


      }
      else {
        this.contactValidation = 1;
        console.log(this.orgPhone.match(phoneno));
        console.log("wrong");

    }

    }

}


 is_urlValidation(str)
{
 var  regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (regexp.test(str))
        {
          this.websiteValidation = 0
         // return true;
         console.log("correct");
         
        }
        else
        {
          this.websiteValidation = 1
          console.log("wrong");
          //return false;
        }
}

RegistrationType(){
if(this.program == "Program"){
  this.showRegistionProgs =true ;
}else {
  this.showRegistionOrgs =true ;
}


}

moveToPage5(){
// promName ;
//openApplicationDate;
//closeApplicationDate ;
//programStartDate ;
//programCloseDate
console.log(this.promName);

console.log(this.openApplicationDate);
console.log(this.closeApplicationDate);
console.log(this.programStartDate);
console.log(this.programCloseDate);
// if(this.promName == undefined  && this.openApplicationDate  == undefined &&this.closeApplicationDate == undefined && this.programStartDate ==undefined && this.programCloseDate ==undefined){
//   this.alert("Please enter all details")
// } else if (this.promName == undefined ){
//   this.alert("Please enter Programme Name")

// }else if (this.openApplicationDate  == undefined){
//   this.alert("Please choose  open application date")
// }else if (this.closeApplicationDate == undefined){
//   this.alert("Please choose close application date")
// }else if (this.programStartDate ==undefined){
//   this.alert("Please choose programme start date")

// }else if (this.programCloseDate ==undefined){
//   this.alert("Please choose programme close date")
// }else {
  
//   var toSlide = document.getElementById("page5");
//   toSlide.style.marginLeft = "-25%";
//}


var toSlide = document.getElementById("page5");
   toSlide.style.marginLeft = "-25%";



}
moveToPage6(){
console.log( this.Programcategory);

console.log(this.ProgramIntroduction );

  console.log(this.objectives );
  
  console.log(this.targetAudience);
  console.log(this.programDescription);

  var toSlide = document.getElementById("page6");
  toSlide.style.marginLeft = "-25%";
}

moveToPage7(){
  console.log(this.programService) ;
  console.log(this.programBenefits) ;
 console.log(this.programAdditionalBenefits ) ;
  console.log(this.EligibleCriteria) 

  var toSlide = document.getElementById("page7");
    toSlide.style.marginLeft = "-25%";
}

backToPage5(){
  var toSlide = document.getElementById("page5");
  toSlide.style.marginLeft = "0%";
}


backToPage6(){
  console.log("clicked");
  
  var toSlide = document.getElementById("page5");
    toSlide.style.marginLeft = "-25%";
  }

 

  moveToPage8(){
console.log(this.applicationLink);
console.log(this.facebook);
console.log(this.twitter);
console.log(this.promPhone);




  }
}


