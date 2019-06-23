import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { IrMethodsProvider } from '../../providers/ir-methods/ir-methods';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import { OnBoardingPage } from '../on-boarding/on-boarding';
import { ViewInformationPage } from '../view-information/view-information';
import swal from "sweetalert";
import Swal from "sweetalert2";
import { TestsPage } from '../tests/tests';


declare var firebase;


declare var google;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  @ViewChild('map') mapRef: ElementRef;
  orgArray = new Array();
  profileArr = new Array();
  promArray = new Array();
  lat = -26.2620;
  map;
  lng = 27.9503;
  marker;
  showMultipleMarker;
  items = new Array()
  orgNames = new Array()
  imagesArr = [];
  name;
  cell;
  category;
  address;
  desc;
  v = 0;
  downloadurl;
  downloadurlLogo;
  programCategory;
  userLocation: String;
  urlGallery1 = "../../assets/imgs/default image/default image for uploads.jpg";
  email
  galleryupload: string;
  icon = 'assets/imgs/pin.png'
  locIcon = 'assets/imgs/here.png'


  mapStyles = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#04592a"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dadada"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#c9c9c9"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    }
  ]
  d = 1;
  imageArr;
  uid;
  contact;
  objective;
  benefit;
  objectives;
  programBenefits;
  eligibleCreteria;
  name1;
  contact1;
  desc1;
  address1;
  alertMessage;
  constructor(public navCtrl: NavController, public IRmethods: IrMethodsProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public toastCtrl: ToastController) {
    this.IRmethods.getAllOrganizations().then((data: any) => {
      this.orgArray = data;
      var names = this.IRmethods.getOrgNames()
      this.storeOrgNames(names)
    })

    this.IRmethods.getCurrentLocation(this.lat, this.lng).then((radius: any) => {
    })

  }
  addProgramme() {
    this.navCtrl.push(TestsPage, { pushid: '1' })
  }

  ionViewWillEnter() {
    this.IRmethods.getOrgProfile().then((data: any) => {
      if (data == null) {

      } else {
        this.name = data.prograName;
        this.category = data.programCategory;
        this.cell = data.promPhone;
        this.address = data.address;
        this.desc = data.intro;
        this.downloadurl = data.downloadurl;
        this.downloadurlLogo = data.downloadurlLogo;
        this.objectives = data.objectives
        this.programBenefits = data.programBenefits
        this.eligibleCreteria = data.eligibleCreteria
      }
    })

    var tempArray = []

    this.getGallery();




  }

  ionViewDidLoad() {


    // setTimeout(() => {

    //   if (this.name == undefined) {
    //     this.navCtrl.setRoot(RegisterPage);
    //     // alert("Not visited the landing page");
    //   }
    // }, 5000);
  }
  UpdateCover() {
    this.alertMessage = "Please Wait...";
    let b = window.innerHeight;

    Swal.fire({
      title: "Loading",
      html: this.alertMessage,
      // timer: 4000,
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    }).then(result => { });
    this.IRmethods.uploadProfilePic(this.downloadurl, this.name).then(data => {
      this.IRmethods.update(this.downloadurl, this.downloadurlLogo).then((data) => {
      });
      const Toast = Swal.mixin({
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 3000
      });

      Toast.fire({
        type: "success",
        title: "Cover Photo Successfully added"
      });
    },
      Error => {
        const alert = this.alertCtrl.create({
          cssClass: "myAlert",
          subTitle: Error.message,
          buttons: ['OK']
        });
        alert.present();
      })
  }
  UpdateLogo() {
    this.alertMessage = "Please Wait...";
    let b = window.innerHeight;

    Swal.fire({
      title: "Loading",
      html: this.alertMessage,
      // timer: 4000,
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    }).then(result => { });
    this.IRmethods.uploadProfilePic(this.downloadurl, this.name).then(data => {
      this.IRmethods.update(this.downloadurl, this.downloadurlLogo).then((data) => {
      });

      const Toast = Swal.mixin({
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 3000
      });

      Toast.fire({
        type: "success",
        title: "Logo Successfully added"
      });

    },
      Error => {
        const alert = this.alertCtrl.create({
          cssClass: "myAlert",
          subTitle: Error.message,
          buttons: ['OK']
        });
        alert.present();
      })
  }

  getUid1() {
    this.IRmethods.getUserID().then(data => {
      this.uid = data
      // console.log(this.uid);
    })
  }
  retreivePics1() {
    this.imageArr.length = 0;
    this.getUid1();
    this.IRmethods.GetUserProfile().then(data => {
      var keys: any = Object.keys(data);
      for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        if (this.uid == data[k].uid) {
          let objt = {
            downloadurl: data[k].downloadurl
          }
          this.imageArr.push(objt);
        }
      }

    }, Error => {
      console.log(Error)
    });


  }
  UploadProfilePic(event: any) {
    this.d = 1;

    let opts = document.getElementsByClassName('options') as HTMLCollectionOf<HTMLElement>;

    if (this.d == 1) {
      // opts[0].style.top = "10vh";
      if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();

        if (event.target.files[0].size > 1500000) {
          let alert = this.alertCtrl.create({
            cssClass: "myAlert",
            title: "Photo too large",
            subTitle: "Please choose a photo with 1.5MB or less.",
            buttons: ['OK']
          });
          alert.present();
        }
        else {
          reader.onload = (event: any) => {
            this.downloadurl = event.target.result;
          }
          reader.readAsDataURL(event.target.files[0]);
        }

      }

    }
  }

  ng

  UploadLogo(event: any) {
    this.d = 1;

    let opts = document.getElementsByClassName('options') as HTMLCollectionOf<HTMLElement>;

    if (this.d == 1) {
      // opts[0].style.top = "10vh";
      if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();

        if (event.target.files[0].size > 1500000) {
          let alert = this.alertCtrl.create({
            cssClass: "myAlert",
            title: "Photo too large",
            subTitle: "Please choose a photo with 1.5MB or less.",
            buttons: ['OK']
          });
          alert.present();
        }
        else {
          reader.onload = (event: any) => {
            this.downloadurlLogo = event.target.result;
          }
          reader.readAsDataURL(event.target.files[0]);
        }

      }

    }
  }

  getImages(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      (reader.onload = (event: any) => {
        this.urlGallery1 = event.target.result;
        // console.log(this.urlGallery1);
        var user = firebase.auth().currentUser.uid;
        // console.log(user);
        firebase
          .database()
          .ref("Gallery/" + user + "/")
          .push({
            GalUrl: this.urlGallery1
          });
        this.getGallery();
        this.dismissUploader();
      }),
        Error => {
          alert(Error);
        };
      reader.readAsDataURL(event.target.files[0]);
      this.galleryupload = "Upload More";
    }
  }

  getGallery() {
    // console.log("getting gallery");
    this.retrieveGal().then((data: any) => {
      this.imagesArr.length = 0;
      var keys = data.keys;
      var temp = data.detals;
      // console.log(keys);
      // console.log(temp);
      for (var x = 0; x < keys.length; x++) {
        this.imagesArr.push(temp[keys[x]]);
      }
      // console.log(this.imagesArr);
    });
  }

  retrieveGal() {
    return new Promise((accpt, rej) => {
      firebase.auth().onAuthStateChanged(function (user) {
        let dbPath = "Gallery/" + user.uid;
        firebase
          .database()
          .ref(dbPath)
          .on("value", (data: any) => {
            if (data.val() != undefined || data.val() != null) {
              let details = data.val();
              let key = Object.keys(details);

              let obj = {
                detals: details,
                keys: key
              };
              // console.log(obj);
              accpt(obj);
            }
          });
      });
    });
  }

  storeOrgNames(names) {
    this.orgNames = names;
    // console.log(this.orgNames);

  }

  signOut() {
    swal({
      text: "Click OK to sign out.",
      icon: "warning",
      // buttons: true,
      dangerMode: true
    }).then(leave => {
      if (leave) {
        this.IRmethods.logout().then(() => {
          window.location.reload();
        }, (error) => {
          // console.log(error.message);
        })
      }

    })
  }







  initializeItems() {
    this.items = this.orgNames
  }

  filterItems(val) {
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        // console.log(val);

        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else if (val == "" || val == null) {
      this.items = [];
    }
  }


  getItems(ev) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        // console.log(val);

        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else if (val == "" || val == null) {
      this.items = [];
    }
    // console.log(this.items);
  }

  tribute = 0;
  showContainer() {
    var Charts = document.getElementsByClassName("chartOverlay") as HTMLCollectionOf<HTMLElement>;
    Charts[0].style.display = "block"
  }

  dates = new Array();
  labels = new Array();

  Views = new Array();
  date = new Array();


  proKey;

  public ratingArr = [];

  orph = 0;
  disablty = 0;
  oldAge = 0;
  theraphy = 0;
  Psychiatric = 0;
  sCenter = 0;
  Rehab = 0;

  ngOnInit() {
    this.initMap();
  }

  initMap() {

    setTimeout(() => {
      this.IRmethods.getLocation(this.lat, this.lng).then((data: any) => {
        // console.log(data);
        this.userLocation = data;
        // console.log(this.userLocation);
      })

    }, 1000);
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Please wait...',
      duration: 15000
    });
    loading.present();

    // console.log(this.lng)
    const options = {
      center: { lat: this.lat, lng: this.lng },
      zoom: 10,
      disableDefaultUI: true,
      icon: this.icon,
      styles: this.mapStyles
    }
    var map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    // adding user marker to the map 
    var marker = new google.maps.Marker({
      map: this.map,
      zoom: 10,
      icon: this.locIcon,
      title: 'Your Location',
      position: this.map.getCenter(),
      styles: this.mapStyles
      //animation: google.maps.Animation.DROP,
    });

    // console.log();


    setTimeout(() => {
      // console.log("show markers");

      this.markers();
      // console.log("show markerzzzzzzzzzzzzzzzzzzzzzzz");
    }, 16000)
    // console.log( this.userLocation);
    setTimeout(() => {
      var contentString = '<div id="content">' +



        '</div>' +
        this.userLocation
      '</div>';

      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      marker.addListener('click', function () {
        infowindow.open(map, marker);
        map.setZoom(13);
        map.setCenter(marker.getPosition());
      });

    }, 4000);


  }
  markers() {
    // console.log(this.orgArray);
    for (let index = 0; index < this.orgArray.length; index++) {
      var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/'
      let showMultipleMarker = new google.maps.Marker({
        map: this.map,
        icon: this.icon,
        title: this.orgArray[index].orgName,
        size: { width: 5, height: 5 },
        position: { lat: parseFloat(this.orgArray[index].lat), lng: parseFloat(this.orgArray[index].long) },
        label: name,
        zoom: 15,
        styles: this.mapStyles

      });


      //
      // console.log(this.orgArray[index].desc);
      // console.log(this.orgArray[index].lat);
      // console.log(this.orgArray[index].long);



      let infowindow = new google.maps.InfoWindow({
        content:
          '<div style="width: 400px; transition: 300ms;"><b>' +
          this.orgArray[index].programCategory +
          '</b><div style="display: flex; padding-top: 10px;">' +
          '<img style="height: 100px; width: 100px; object-fit: cober; border-radius: 50px;" src=' +
          this.orgArray[index].img +
          ">" +
          '<div style="padding-left: 10px;padding-right: 10px">' +
          this.orgArray[index].intro +
          "</div><br>" +



          "</div>"
      });
      showMultipleMarker.addListener('click', () => {
        this.map.setZoom(14);
        this.map.setCenter(showMultipleMarker.getPosition());
        // console.log(index);
        infowindow.open(showMultipleMarker.get(this.map), showMultipleMarker);
        // console.log(index);

      });

    }
  }





  dismissUploader() {
    var uploader = document.getElementsByClassName(
      "forUploading"
    ) as HTMLCollectionOf<HTMLElement>;

    uploader[0].style.display = "none";
  }

  userID;
  assignUserID(id) {
    this.userID = id;
  }
  state = 0;

  decideState() {
    if (this.state == 0) {
      this.showSlide();
    } else {
      this.hideSlide();
    }

    // console.log(this.state);
  }

  showSlide() {
    var blurMap = document.getElementById("map");
    let slider = document.getElementsByClassName("absolutely") as HTMLCollectionOf<HTMLElement>;
    // let arrow = document.getElementById("myArrow");

    // arrow[0].style.left = "48%";
    // arrow[0].style.transform = "translateX(-60%)";
    // arrow.style.transform = "rotateZ(180deg)";
    // arrow[0].style.transform = "translateX(-50%)";
    slider[0].style.bottom = "10px";
    blurMap.style.filter = "blur(3px)";
    this.state = 1;
  }
  hideSlide() {
    var blurMap = document.getElementById("map");
    let slider = document.getElementsByClassName("absolutely") as HTMLCollectionOf<HTMLElement>;
    // let arrow = document.getElementById("myArrow");

    // arrow[0].style.left = "48%";
    // arrow[0].style.transform = "translateX(-60%)";
    // arrow[0].style.transform = "rotateZ(0DEG)";
    slider[0].style.bottom = "-180px";
    // arrow.style.transform = "rotateZ(0deg)";
    blurMap.style.filter = "blur(0px)";

    this.state = 0;
  }

  goToProfile() {

    this.hideSlide();
    // alert("clicked")
    var prof = document.getElementsByClassName("profOverlay") as HTMLCollectionOf<HTMLElement>;
    var profil = document.getElementsByClassName("cont") as HTMLCollectionOf<HTMLElement>;
    // var theGal = document.getElementsByClassName("gallery") as HTMLCollectionOf<HTMLElement>;
    prof[0].style.display = "block";
    profil[0].style.opacity = "1";
    // theGal[0].style.opacity = "1";
  }

  closeDIV() {
    var x = document.getElementsByClassName("overlay") as HTMLCollectionOf<HTMLElement>;
    var bg = document.getElementsByClassName("cont") as HTMLCollectionOf<HTMLElement>;
    // var imgs = document.getElementsByClassName("gallery") as HTMLCollectionOf<HTMLElement>;
    // imgs[0].style.filter = "blur(0)";
    // imgs[0].style.opacity = "1"
    bg[0].style.filter = "blur(0)";
    x[0].style.opacity = "0";
    setTimeout(() => {
      x[0].style.display = "none";
    }, 700);
  }




  showGal() {
    var y = document.getElementsByClassName("gallery") as HTMLCollectionOf<HTMLElement>;
    var x = document.getElementsByClassName("adder") as HTMLCollectionOf<HTMLElement>;
    if (this.v == 0) {
      y[0].style.right = "10px";

      setTimeout(() => {
        x[0].style.display = "block";
      }, 300);
      this.v = 1;
    } else {
      // x[0].style.display = "none"
      y[0].style.right = "-260px";

      setTimeout(() => {
        x[0].style.display = "none";
      }, 300);
      this.v = 0;
    }
  }
  pullDown() {
    var needer = document.getElementsByClassName("needs") as HTMLCollectionOf<HTMLElement>;

    if (this.tribute == 0) {
      needer[0].style.transform = "translate(-50%, 0%)";
      this.tribute = 1;
      document.getElementById("orger").style.transform = "rotateZ(180DEG)"
    }
    else {
      needer[0].style.transform = "translate(-50%, -85%)";

      document.getElementById("orger").style.transform = "rotateZ(0DEG)"
      this.tribute = 0
    }
  }


  closeProfile() {
    // alert("clicked")

    this.hideSlide();
    var prof = document.getElementsByClassName("profOverlay") as HTMLCollectionOf<HTMLElement>;
    var blurMap = document.getElementById("map");
    var profil = document.getElementsByClassName("cont") as HTMLCollectionOf<HTMLElement>;
    // var y = document.getElementsByClassName("gallery") as HTMLCollectionOf<HTMLElement>;
    // var q = document.getElementsByClassName("adder") as HTMLCollectionOf<HTMLElement>;
    blurMap.style.filter = "blur(0px)";
    // y[0].style.right = "-260px";
    // y[0].style.opacity = "0";
    // q[0].style.display = "none";
    profil[0].style.opacity = "0";
    setTimeout(() => {
      if (this.v == 0) {

        prof[0].style.display = "none";
      }
      else {
        setTimeout(() => {
          prof[0].style.display = "none";
        }, 500);
      }
      this.v = 0;
    }, 700)
  }
  title;
  price;
  description;
  addContributes() {

    if (this.title == null || this.title == "" || this.title == undefined) {
      this.title = " "
      this.pullDown();
    }
    if (this.description == null || this.description == " " || this.description == "" || this.description == undefined) {

    }
    else {


    }
  }

  viewInfor(item) {
    for (let index = 0; index < this.orgArray.length; index++) {
      if (item == this.orgArray[index].programCategory) {
        // console.log(this.orgArray[index]);
        this.navCtrl.push(ViewInformationPage, { ObjectInfo: this.orgArray[index] })

      }

    }

  }



}
