import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { IrMethodsProvider } from '../../providers/ir-methods/ir-methods';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import { OrganizationProfilePage } from "../organization-profile/organization-profile"
import { OnBoardingPage } from '../on-boarding/on-boarding';
import Swal from 'sweetalert2';
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
  urlGallery1 = "../../assets/imgs/default image/default image for uploads.jpg";
  email
  galleryupload: string;
  icon = 'assets/imgs/wifi2.svg'
  locIcon = 'assets/imgs/loc-user.svg'
  mapStyles = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ebe3cd"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#523735"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f1e6"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#c9b2a6"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#dcd2be"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#ae9e90"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#93817c"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#a5b076"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#447530"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f1e6"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#fdfcf8"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f8c967"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#e9bc62"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e98d58"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#db8555"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#806b63"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8f7d77"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#ebe3cd"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#b9d3c2"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#92998d"
        }
      ]
    }
  ]

  d = 1;
  imageArr;
  uid;
  contact;
  constructor(public navCtrl: NavController, public IRmethods: IrMethodsProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public toastCtrl: ToastController) {
    this.IRmethods.getAllOrganizations().then((data: any) => {
      this.orgArray = data;
      console.log(this.orgArray);
      setTimeout(() => {
        var names = this.IRmethods.getOrgNames()
        console.log(names);
        this.storeOrgNames(names)
        // this.loading.dismiss()
      }, 2500);
    })

    setTimeout(() => {
      this.IRmethods.getCurrentLocation(this.lat, this.lng).then((radius: any) => {
        console.log(this.lat);
        console.log(this.lng);
        console.log(radius);
      })

    }, 5000);
    
    Swal.fire({
      imageUrl: "../../assets/imgs/4IR logo.png",
      imageHeight: 300,
      imageAlt: 'A tall image',
      text: "Welcome to the 4IR Content Management System. Click OK to get started, to edit your profile or add programmes, click 'ORGANISATION PROFILE' on the top right of the screen.",
    })


  

    this.IRmethods.getOrgProfile().then((data: any) => {
      this.name = data.prograName;
      this.category = data.programCategory;
      this.cell = data.promPhone;
      this.address = data.address;
      this.desc = data.intro;
      this.downloadurl = data.downloadurl;
      this.downloadurlLogo = data.downloadurlLogo;
      // this.email = data.email;
      // this.contact = data.contact;
      console.log(this.name)

      console.log(data)
      // console.log(this.downloadurlLogo)
    })

  }
  addProgramme() {
    this.navCtrl.push(OnBoardingPage, { pushid: '1' })
  }

  ionViewWillEnter() {

  var   tempArray = []
    // this.initMap() ;
    this.getGallery();


  //   this.IRmethods.getProgramme().then((data:any) => {
  //     this.promArray.push(data)
  //     console.log(this.promArray)

  //     for (let index = 0; index < data.length; index++) {
  //         tempArray.push(data[index])
        
  //     }
 
  //     console.log(tempArray);

  //     this.promArray =tempArray ;
      
    
  // })
  }

  EditPrfile() {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Please wait...',
      duration: 4000000
    });
    loading.present();
    this.IRmethods.uploadProfilePic(this.downloadurl, this.name).then(data => {
      console.log('added to db');
      this.IRmethods.update(this.downloadurl, this.downloadurlLogo).then((data) => {
        this.imageArr.push(data);
      });
      console.log(this.imageArr);
      loading.dismiss();
      // this.viewCtrl.dismiss();
      const toast = this.toastCtrl.create({
        message: 'Profile successfully updated!',
        duration: 3000
      });
      toast.present();
      this.navCtrl.pop();

    },
      Error => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          cssClass: "myAlert",
          subTitle: Error.message,
          buttons: ['OK']
        });
        alert.present();
      })
    // this.viewCtrl.dismiss()
  }

  getUid1() {
    this.IRmethods.getUserID().then(data => {
      this.uid = data
      console.log(this.uid);
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
        console.log(this.urlGallery1);
        var user = firebase.auth().currentUser.uid;
        console.log(user);
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
    console.log("getting gallery");
    this.retrieveGal().then((data: any) => {
      this.imagesArr.length = 0;
      var keys = data.keys;
      var temp = data.detals;
      console.log(keys);
      console.log(temp);
      for (var x = 0; x < keys.length; x++) {
        this.imagesArr.push(temp[keys[x]]);
      }
      console.log(this.imagesArr);
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
              console.log(obj);
              accpt(obj);
            }
          });
      });
    });
  }

  storeOrgNames(names) {
    this.orgNames = names;
    console.log(this.orgNames);

  }

  signOut() {
    const confirm = this.alertCtrl.create({
      // cssClass: "myAlert",
      title: 'Confirm',
      message: 'Are you sure you want to sign out?',

      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.IRmethods.logout().then(() => {
              this.navCtrl.push(RegisterPage, { out: 'logout' });
            }, (error) => {
              console.log(error.message);
            })

          }
        },
        {
          text: 'No',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    confirm.present();

  }







  initializeItems() {
    this.items = this.orgNames
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        console.log(val);

        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else if (val == "" || val == null) {
      this.items = [];
    }
    console.log(this.items);
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


    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Please wait...',
      duration: 11000
    });
    loading.present();

    console.log(this.lng)
    const options = {
      center: { lat: this.lat, lng: this.lng },
      zoom: 8,
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



    setTimeout(() => {
      this.markers();
    }, 12000)

    var contentString = '<div id="content">' +
      '<div id="siteNotice">' +
      '</div>' +
      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +


      '</div>' +
      '</div>';

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    marker.addListener('click', function () {
      infowindow.open(map, marker);
      map.setZoom(13);
      map.setCenter(marker.getPosition());
    });

  }
  markers() {
    console.log(this.orgArray);
    for (let index = 0; index < this.orgArray.length; index++) {
      var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/'
      this.showMultipleMarker = new google.maps.Marker({
        map: this.map,
        icon: this.icon,
        title: this.orgArray[index].orgName,
        size: { width: 5, height: 5 },
        position: { lat: parseFloat(this.orgArray[index].lat), lng: parseFloat(this.orgArray[index].long) },
        label: name,
        zoom: 8,
        styles: this.mapStyles

      });


      //
      console.log(this.orgArray[index].desc);
      console.log(this.orgArray[index].lat);
      console.log(this.orgArray[index].long);



      let infowindow = new google.maps.InfoWindow({
        content:
          '<div style="width: 400px; transition: 300ms;"><b>' +
          this.orgArray[index].orgName +
          '</b><div style="display: flex; padding-top: 10px;">' +
          '<img style="height: 100px; width: 100px; object-fit: cober; border-radius: 50px;" src=' +
          this.orgArray[index].img +
          ">" +
          '<div style="padding-left: 10px;padding-right: 10px">' +
          this.orgArray[index].desc +
          "</div><br>" +



          "</div>"
      });
      this.showMultipleMarker.addListener('click', () => {
        console.log(index);



        infowindow.open(this.showMultipleMarker.get(this.map), this.showMultipleMarker);
        //  this.goToProfile() ;
        ///infowindow.open(marker.get('map'), marker);
        console.log(index);
        //  this.navCtrl.push(OrganizationProfilePage, { orgObject: this.orgArray[index] });
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

    console.log(this.state);
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
      // swal("Please state your organisational needs in the fields provided");
    }
    else {

      // firebase.auth().onAuthStateChanged(user => {
      //     firebase.database().ref('contributes/' + user.uid + '/').push({
      //       Title: this.title,
      //       Description: this.description,
      //     }, Error => {
      //       swal(Error.message);
      //     });

      //     const Toast = Swal.mixin({
      //       toast: true,
      //       position: 'center',
      //       showConfirmButton: false,
      //       timer: 3000
      //     });

      //     Toast.fire({
      //       type: 'success',
      //       title: 'You have successfully added a contribute'
      //     })
      //   this.title="";
      //   this.description="";
      //   this.pullDown();
      // })
    }
  }
}
