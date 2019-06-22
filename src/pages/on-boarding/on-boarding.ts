import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { IrMethodsProvider } from '../../providers/ir-methods/ir-methods';
import { HomePage } from "../../pages/home/home";
import { LoginPage } from '../login/login';
import * as moment from 'moment';
declare var google;
declare var firebase;
import Swal from 'sweetalert2';
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
  showCoffeeShopServices: boolean = false;
  showWebsiteHintInfo: boolean = false
  websiteValidation;
  applicationLink;
  promPhone;
  twitter;
  facebook;
  programService;
  serviceArrayTemp = []
  showPhoneHint :boolean =false ;

  heiServices = [{ title: "Testing & Analytical", description: " Services include material testing and behaviour analysis, as well as quality tests. These can be R&D or routine jobs according to existing standards or client's specifications, using readily available high-end software and equipment." },


  { title: "Rapid Prototyping and Manufacturing", description: 'model with regard to the indicated functional aspects of a product. The manufacturing is not limited to batch/pilot manufacturing of models, but can include either contract machining or manufacturing, based on the clients drawings or specifications' },
  { title: "Consultation, Technology Audit and Feasibility Study", description: 'Consultation includes search and technology brokerage services, finding the know-how as a diagnostic service, assessment or consultancy. This is usually the first part of any project to identify the potential for improvement and the required interventions. This involves the searching and sourcing of technology from outside the Universities of Technology, generally from firms, engineering consultants; brokering as well as possibly managing technology transfers to SME' },
  { title: "Process or Product Improvement", description: 'Productivity, workflow and quality all improve production facilities and products by applying standard procedures and methods. In many cases, this would also involve testing and analytical services to make the product conform to required specifications on new market demands and regulations' },
  { title: "Applied Development, Engineering and Design", description: 'This involves the application of engineering processes from CAD to CAM now CA ,including scaled production based on the know-how from Technology Stations, needing professional engineering and design skills as well as identification and sourcing of technology or equipment. These services lead to demand driven projects that can be funded by various funding Agencies' },

  ]
  libraryService = [{ title: "Research", description: " involves the step-by-step process used to gather information in order to write a paper, create a presentation, or complete a project. ... They describe, analyze, and/or evaluate information found in primary sources" },
  { title: "Training", description: '"The latest information and communication technology (ICT) developments, including data curation, digital preservation, data management planning, institutional repositories, social media, online learning, publishing, e-books and mobile technology offer wonderful new opportunities in the delivery of information services and the way libraries are managed. Librarianship forms the basis of specialization and diverse career opportunities including document management, knowledge management, childrens librarianship, research librarianship and electronic resources management"' }


  ]

  learningCenterService = [{ title: "Skill Development", description: " is the process of (1) identifying your skill gaps, and (2) developing and honing these skills. It is important because your skills determine your ability to execute your plans with success. ... In goal achievement, your skills are your tools." }
    , { title: "Training", description: "Training is a program that helps people learn specific knowledge or skills to improve performance in their current roles. Development is more expansive and focuses on people growth and future performance, rather than an immediate job role" },
  { title: "EnterpreneurShip Programme", description: "The Entrepreneurship Development Programme is aimed at creating a conducive environment for young entrepreneurs to access relevant entrepreneurship skills, knowledge, values and attitudes for their businesses." }
  ]

  mallServices = [{ title: "Internet ", description: "Wanting to share your Mall of Africa experience with your friends and family on social media? Needing to send a business email in the midst of shopping? Not a problem! You can surf the internet for free wherever you are at Mall of Africa." },
  { title: "Training ", description: "Training is a program that helps people learn specific knowledge or skills to improve performance in their current roles. Development is more expansive and focuses on people growth and future performance, rather than an immediate job role" }

  ]

  internetCafeServices = [{ title: "Internet", description: "s a place that offers customers hi-speed internet access, other computer services and variety of PC games. It deals with internet time that a customer buys and it can be sold per hour or minute and sometimes longer" },
  { title: " Printing", description: 'Managed print services (MPS) is the provision and oversight of business document output needs by an external service provider. ... The next step is typically a partial or complete replacement of existing hardware, including printers, faxes, scanners, photocopiers and multifunction (MFP) devices.' }
    , { title: "fax", description: "an exact copy of a document made by electronic scanning and transmitted as data by telecommunications links." }

  ]


  allServices = [{ title: "Testing & Analystical", description: " Services include material testing and behaviour analysis, as well as quality tests. These can be R&D or routine jobs according to existing standards or client's specifications, using readily available high-end software and equipment." },
  { title: "Rapid Prototyping and Manufacturing", description: 'model with regard to the indicated functional aspects of a product. The manufacturing is not limited to batch/pilot manufacturing of models, but can include either contract machining or manufacturing, based on the clients drawings or specifications' },
  { title: "Consultation, Technology Audit and Feasibility Study", description: 'Consultation includes search and technology brokerage services, finding the know-how as a diagnostic service, assessment or consultancy. This is usually the first part of any project to identify the potential for improvement and the required interventions. This involves the searching and sourcing of technology from outside the Universities of Technology, generally from firms, engineering consultants; brokering as well as possibly managing technology transfers to SME' },
 
  { title: "Skill Development", description: " is the process of (1) identifying your skill gaps, and (2) developing and honing these skills. It is important because your skills determine your ability to execute your plans with success. ... In goal achievement, your skills are your tools." },
  { title: "Enterpreneurship Programme", description: "The Entrepreneurship Development Programme is aimed at creating a conducive environment for young entrepreneurs to access relevant entrepreneurship skills, knowledge, values and attitudes for their businesses." },
  { title: "Training ", description: "Training is a program that helps people learn specific knowledge or skills to improve performance in their current roles. Development is more expansive and focuses on people growth and future performance, rather than an immediate job role" } ,
  { title: "Applied Development, Engineering and Design", description: 'This involves the application of engineering processes from CAD to CAM now CA ,including scaled production based on the know-how from Technology Stations, needing professional engineering and design skills as well as identification and sourcing of technology or equipment. These services lead to demand driven projects that can be funded by various funding Agencies' },
  {tittle:"Internet" , description:"provider is a company that provides access to the Internet. Most ISPs require you to subscribe in order to use their services, but there are ways to connect to the Internet for free"} ,
  
  { title: "Printing", description: 'Managed print services (MPS) is the provision and oversight of business document output needs by an external service provider. ... The next step is typically a partial or complete replacement of existing hardware, including printers, faxes, scanners, photocopiers and multifunction (MFP) devices.' }
]





  coffeeshopServices = [{ title: "Internet", description: "Offering internet to customers" }]
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

  program;
  showRegistionOrgs: boolean = false;
  showRegistionProgs: boolean = false;

  // program variables 
  promName;
  openApplicationDate;
  closeApplicationDate;
  programStartDate;
  programCloseDate;
  programType;
  other;

  Programcategory;
  ProgramIntroduction;
  objectives;
  targetAudience;
  programDescription;

  programServicez;
  programBenefits;
  programAdditionalBenefits;
  EligibleCriteria;
  promAddress;
  Programemail;

  showApplicationLink: boolean = false;
  

  showProgramBenefits: boolean = false;
  showAdditionalBenefits: boolean = false;
  showEligibleCriteria: boolean = false;
  showProgramIntroduction: boolean = false;
  showObjective: boolean = false;


  hideRegisterAs: boolean = true;
  trackopenAplication;
  trackcloseApplication;
  trackopenProgram;
  trackcloseProgram;

  programContactValidation;

  showOther: boolean = false;
  showProgramcategory: boolean = true;

  pushid = this.navParams.get('pushid')

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private _ngZone: NgZone, public IRmethods: IrMethodsProvider, public loadingCtrl: LoadingController) {
    // console.log(this.pushid);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OnBoardingPage');
    console.log(this.email);
    console.log(this.heiServices[0].title);

    this.is_urlValidation("www.youtube.com");
    if (this.pushid == "1") {
      this.RegistrationType()
    }



  }
  moveToPage2() {

    this.phonenumberValidatin();
    var progBar = document.getElementById("theDot");
    this.is_urlValidation(this.orgWebsite);
    if (this.orgName == undefined && this.orgAdress == undefined && this.orgPhone == undefined && this.orgWebsite == undefined && this.orgDescription == undefined) {
      this.alert("Please complete all details ")
    } else if (this.orgName == undefined) {
      this.alert("Enter organisation Name ")
    } else if (this.orgAdress == undefined) {
      this.alert("Enter Address  ")
    } else if (this.contactValidation == 1) {
      this.alert("The phone numbers you have entered is invalid, please enter a valid phone numbers  ")
    } else if (this.websiteValidation == 1) {
      this.alert("The website address you have entered is invalid, please enter a valid website address ")
    } else if (this.checkAddress == 1) {
      this.alert("The address you have entered is invalid, please enter a valid address ")
    }
    else if (this.orgPhone == undefined) {
      this.alert("Enter Phone numbers  ")
    } else if (this.orgDescription == undefined) {
      this.alert("Enter Phone numbers  ")

    } else {

      var toSlide = document.getElementById("page1");
      toSlide.style.marginLeft = "-25%";
      // this.progressBar = this.progressBar + 25
      progBar.style.width = "50%";

    }





  }
  moveToPage3() {


    var progBar = document.getElementById("theDot");


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
        this.progressBar = this.progressBar + 25;
        progBar.style.width = "75%";
      } else {
        this.alert("Please complete all details")
      }

    }

    else {

      this.alert("Please complete all details")
    }



  }


  moveToPage4() {

    var progBar = document.getElementById("theDot");
    if (this.category != undefined && this.catService.length != 0) {
      console.log(this.catService);


      var toSlide = document.getElementById("page1");
      toSlide.style.marginLeft = "-75%";
      this.progressBar = this.progressBar + 25;
      progBar.style.width = "100%";
    } else {
      this.alert("Complete all the Details ")
    }

  }

  backToPage3() {
    var progressBar = document.getElementById("theDot");
    var toSlide = document.getElementById("page1");
    toSlide.style.marginLeft = "-50%";
    progressBar.style.width = "75%"
  }
  backToPage2() {
    var progressBar = document.getElementById("theDot");
    var toSlide = document.getElementById("page1");
    toSlide.style.marginLeft = "-25%";
    progressBar.style.width ="50%"
  }
  backToPage1() {
    var progressBar = document.getElementById("theDot");
    var toSlide = document.getElementById("page1");
    toSlide.style.marginLeft = "0%";
    progressBar.style.width ="25%"
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

    // let loading = this.loadingCtrl.create({
    //   spinner: 'bubbles',
    //   content: 'successfully an organization...',
    //   duration: 4000
    // });
    // loading.present();

    this.IRmethods.addOrganisation(this.email, this.orgAddressObject.lat, this.orgAddressObject.lng, this.orgAddressObject.city, this.orgPhone, this.category, this.orgName, this.orgDescription, this.catService, this.orgAdress, this.offerWifi, this.wifi, this.chooseWifiRange, this.orgWebsite).then(() => {
      console.log("added ");


      Swal.fire({
        imageUrl: "../../assets/imgs/4IR logo.png",
        imageHeight: 300,
        imageAlt: 'A tall image',
        text: "Welcome to the 4IR Content Management System. Click OK to get started, to edit your profile or add programmes, click 'ORGANISATION PROFILE' on the top right of the screen.",
      })
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
      this.showCoffeeShopServices = true
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
    if (this.orgAdress != undefined) {
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
      label: 'Testing & Analytical',
      value: 'Testing & Analytical',
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

          if (data[index] == "Testing & Analytical") {
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

        this.catService = temArray;
        console.log(this.catService = temArray);

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
          } else if (data[index] == "fax") {
            temArray.push(this.internetCafeServices[2])

          }

        }

        this.catService = temArray;
        console.log(this.catService = temArray);
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
          } else if (data[index] == "EnterpreneurShip Programme") {
            temArray.push(this.learningCenterService[2])

          }

        }

        this.catService = temArray;
        console.log(this.catService = temArray);

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

        this.catService = temArray;
        console.log(this.catService = temArray);
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

        this.catService = temArray;
        console.log(this.catService = temArray);
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


  programPhoneNumber(phone) {


    var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;


    if (phone.match(phoneno)) {

      this.programContactValidation = 0;


    }
    else {
      this.programContactValidation = 1;

      console.log("wrong");

    }




  }
  websiteV;
  is_urlValidation(str) {
    var regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (regexp.test(str)) {
      this.websiteValidation = 0
      this.websiteV = 0
      // return true;
      console.log("correct website");

    }
    else {
      this.websiteV = 1;
      this.websiteValidation = 1
      console.log("wrong website");
      //return false;
    }
  }

  RegistrationType() {
    if (this.program == undefined) {
      if (this.pushid == "1") {
        this.showRegistionProgs = false;
        this.showRegistionOrgs = true;
        this.hideRegisterAs = true
        thePlaceholder.style.display = "none"
      } else {
        this.showRegistionProgs = false;
        this.showRegistionOrgs = true;
        this.hideRegisterAs = true
        thePlaceholder.style.display = "none"

      }
    }
    var thePlaceholder = document.getElementById("placeholderDiv");
    if (this.program == "Programme") {
      this.showRegistionProgs = false;
      this.showRegistionOrgs = true;
      this.hideRegisterAs = true
      thePlaceholder.style.display = "none"
    } else {
      this.showRegistionOrgs = false;
      this.showRegistionProgs = true;
      this.hideRegisterAs = true
      thePlaceholder.style.display = "none"
    }


  }

  moveToPage2progs() {

    let currentTime = new Date();
    let currentDate = moment(currentTime).format('YYYY-MM-DD')

    let openApplication = moment(this.openApplicationDate).format('YYYY-MM-DD');
    let closeApplication = moment(this.closeApplicationDate).format('YYYY-MM-DD');

    let openProgram = moment(this.programStartDate).format('YYYY-MM-DD');
    let closeProgram = moment(this.programCloseDate).format('YYYY-MM-DD');


    var progressBar = document.getElementById("theDot");


    console.log(currentDate);
    console.log(openApplication);

    if (this.Programcategory == "Other") {
      this.Programcategory = this.other
    }


    if (openApplication >= currentDate) {
      console.log("innnn");

      this.trackopenAplication = 0
      this.trackopenProgram = 0

    } else {
      this.trackopenAplication = 1
      this.trackopenProgram = 1

    }

    if (closeApplication > openApplication) {

      this.trackcloseApplication = 0;

    } else {
      this.trackcloseApplication = 1

    }


    if (openProgram >= currentDate) {
      this.trackopenProgram = 0

    } else {
      this.trackopenProgram = 1

    }

    if (closeProgram > openProgram) {
      this.trackcloseProgram = 0
    } else {
      this.trackcloseProgram = 1
    }

    console.log(this.Programcategory);

    if (this.promName == undefined && this.openApplicationDate == undefined && this.closeApplicationDate == undefined && this.programStartDate == undefined && this.programCloseDate == undefined && this.Programcategory == undefined) {
      this.alert("Please enter all details")
    } else if (this.promName == undefined) {
      this.alert("Please enter Programme Name")

    } else if (this.openApplicationDate == undefined) {
      this.alert("Please choose  open application date")
    } else if (this.closeApplicationDate == undefined) {
      this.alert("Please choose close application date")
    } else if (this.programStartDate == undefined) {
      this.alert("Please choose programme start date")

    } else if (this.trackopenAplication == 1) {
      this.alert("Please the current day or future days ")
    } else if (this.trackcloseApplication == 1) {
      this.alert("Your closing date has passed , please select the correct date ")
    } else if (this.trackopenProgram == 1) {
      this.alert("Please the current day or future for open programme  ")
    } else if (this.trackcloseProgram == 1) {
      this.alert("Your closing date has passed , please select the correct date for program application ")
    }
    else if (this.programCloseDate == undefined) {
      this.alert("Please choose programme close date")
    } else if (this.Programcategory == undefined) {
      this.alert("Please choose Programme category ")
    }
    else {

      var toSlide = document.getElementById("page1");
      toSlide.style.marginLeft = "-25%";
      this.progressBar = this.progressBar + 25
      progressBar.style.width = "50%";
    }




  }
  moveToPage3progs() {
    var progressBar = document.getElementById("theDot");

    if (this.Programcategory == undefined && this.ProgramIntroduction == undefined && this.targetAudience == undefined && this.objectives == undefined && this.programDescription == undefined) {
      this.alert("Please enter all details")
    } else if (this.ProgramIntroduction == undefined) {
      this.alert("Please enter introduction  ")
    } else if (this.targetAudience == undefined) {
      this.alert("Please choose target audience")
    } else if (this.objectives == undefined) {
      this.alert("Please enter the objectives")
    } else if (this.programDescription == undefined) {
      this.alert("Please enter  program description ")

    } else {

      var toSlide = document.getElementById("page1");
      toSlide.style.marginLeft = "-50%";
      this.progressBar = this.progressBar + 25;
      progressBar.style.width = "75%";
    // var toSlide = document.getElementById("page1");
    // toSlide.style.marginLeft = "-50%"
    }

  }

  moveToPage4progs() {
    var  progressBar = document.getElementById("theDot")
    console.log(this.programBenefits);
    console.log(this.programAdditionalBenefits);
    console.log(this.EligibleCriteria)
    console.log(this.programServicez);

    if (this.programBenefits == undefined && this.EligibleCriteria == undefined && this.orgAdress == undefined) {
      this.alert("Please enter all details ")

    } else if (this.programBenefits == undefined) {
      this.alert("Please enter program benefits")
    } else if (this.EligibleCriteria == undefined) {
      this.alert("Please enter eligible criteria")

    }


    else if (this.orgAdress == undefined) {
      this.alert("please enter address")

    } else if (this.checkAddress == 1) {
      this.alert("The address you have entered is invalid, please enter a valid address ")

    }


    else {


      var toSlide = document.getElementById("page1");
      toSlide.style.marginLeft = "-75%";
      this.progressBar = this.progressBar + 25;
      progressBar.style.width = "100%";
    }






  }

  backToPage5() {
    var toSlide = document.getElementById("page5");
    toSlide.style.marginLeft = "0%";
  }


  backToPage6() {
    console.log("clicked");

    var toSlide = document.getElementById("page6");
    toSlide.style.marginLeft = "-25%";
  }
  emailtrack;

  emailAddressValidation(email) {
    let atpos = email.indexOf("@");
    let dotpos = email.lastIndexOf(".")

    if (atpos < 1 || (dotpos - atpos < 2)) {
      this.emailtrack
      
      
      
      = 1
      console.log("wrong email");

    } else {
      this.emailtrack = 0
      console.log("correct email");

    }
  }

  uploadInfoDone() {
    this.is_urlValidation(this.applicationLink)

    if (this.promPhone != undefined) {
      this.programPhoneNumber(this.promPhone);
    }

    if (this.Programemail != undefined) {
      this.emailAddressValidation(this.Programemail)
    }

    if (this.twitter == undefined) {
      this.twitter = " "
    }

    if (this.facebook == undefined) {
      this.facebook = " "
    }

    if(this.programAdditionalBenefits == undefined){
      this.programAdditionalBenefits == ""
    }


    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();

    if (this.promPhone == undefined && this.Programemail == undefined && this.applicationLink == undefined) {
      this.alert("Please enter all the details")

    } else if (this.Programemail == undefined) {
      this.alert("Please enter your email")
    } else if (this.applicationLink == undefined) {
      this.alert("Please enter the application address")
    } else if (this.websiteV == 1) {
      console.log("wrong website ewfewfwerwew");

      this.alert("The web address you have entered is invalid, please enter a valid web address  ")
    } else if (this.programContactValidation == 1) {
      this.alert("The phone numbers you have entered is invalid, please enter a valid phone numbers  ")
    } else if (this.emailtrack == 1) {
      this.alert("The email address you have entered is invalid, please enter a valid email address  ")
    } else {

      this.IRmethods.addProgram(this.promName, this.openApplicationDate, this.closeApplicationDate, this.programStartDate, this.programCloseDate, this.Programcategory, this.ProgramIntroduction, this.objectives, this.targetAudience, this.programDescription, this.programServicez, this.orgAddressObject.lat, this.orgAddressObject.lng, this.orgAddressObject.city, this.orgAdress, this.programBenefits, this.programAdditionalBenefits, this.EligibleCriteria, this.applicationLink, this.promPhone, this.twitter, this.facebook, this.Programemail).then(() => {
        console.log("successfully");
        this.navCtrl.push(HomePage);
        
    
    Swal.fire({
      imageUrl: "../../assets/imgs/4IR logo.png",
      imageHeight: 300,
      imageAlt: 'A tall image',
      text: "Welcome to the 4IR Content Management System. Click OK to get started, to edit your profile or add programmes, click 'ORGANISATION PROFILE' on the top right of the screen.",
    })
      })
      

    }





  }

  services() {

    let alert = this.alertCtrl.create();
    alert.setTitle('Choose your Services');
    alert.addInput({
      type: 'checkbox',
      label: 'Skill Development',
      value: 'Skill Development'
    });


    alert.addInput({
      type: 'checkbox',
      label: 'Training',
      value: 'Training'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Enterpreneurship Programme',
      value: 'Enterpreneurship Programme'
    });
    alert.addInput({
      type: 'checkbox',
      label: 'Testing & Analystical',
      value: 'Testing & Analystical',
      
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


    alert.addInput({
      type: 'checkbox',
      label: 'Internet',
      value: 'Internet'
    });


    alert.addInput({
      type: 'checkbox',
      label: 'Printing',
      value: 'Printing'
    });






    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: (data) => {
        this. serviceArrayTemp = data ;
        var tempArray = []
        console.log(data);
        for (let index = 0; index < data.length; index++) {
          if (data[index] == "Skill Development") {
            console.log(4);
            tempArray.push(this.allServices[3])


          } else if (data[index] == "Training") {
            console.log(6);
            tempArray.push(this.allServices[5])


          } else if (data[index] == "Enterpreneurship Programme") {
          
           

            
            tempArray.push(this.allServices[4])
          } else if (data[index] == "Testing & Analystical") {
            console.log(0);
            tempArray.push(this.allServices[0])

          } else if (data[index] == "Rapid Prototyping and Manufacturing") {
            console.log(1);
            tempArray.push(this.allServices[1])

          } else if (data[index] == "Consultation, Technology Audit and Feasibility Study") {
            console.log(2);
            tempArray.push(this.allServices[2])

          } else if (data[index] == "Applied Development, Engineering and Design") {
            console.log(3);
            tempArray.push(this.allServices[6])

          } else if (data[index] == "Internet") {
            console.log("internet");
            
            tempArray.push(this.allServices[7])

          } else if (data[index] == "Printing" ){
            tempArray.push(this.allServices[8])
          }

        }

        this.programServicez = tempArray

        console.log(this.programServicez);




      }

    });
    alert.present();


  }
  promPhoneHint() {
    console.log("phone");
  }


  selectProgramCategory() {
    console.log("clockkefefervfesfe");
    if (this.Programcategory == 'Other') {
      console.log("tttttt");

      this.showOther = true;
      // this.showProgramcategory = false;
    } else {
      this.showOther = false;
    }
  }

  applicationLinkHint() {
    console.log("applicationLinkHint");

    this.showApplicationLink = true;
  }
  hideapplicationLinkHint() {
    this.showApplicationLink = false;
  }
  programeBenefits() {
    this.showProgramBenefits = true;
  }

  hideProgramBenefits() {
    this.showProgramBenefits = false;
  }


  AdditionalBenefits() {
    this.showAdditionalBenefits = true;
  }

  hideAdditionalBenefits() {
    this.showAdditionalBenefits = false;
  }
  EligibleCriteriaHint() {
    console.log("hin5y5y5");

    this.showEligibleCriteria = true
  }

  hideEligibleCriteria() {
    this.showEligibleCriteria = false;
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

  test(){
    console.log("regfsgfs");
    
  }

}
