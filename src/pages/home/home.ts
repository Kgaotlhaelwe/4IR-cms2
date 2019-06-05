import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { IrMethodsProvider } from '../../providers/ir-methods/ir-methods';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import {OrganizationProfilePage} from "../organization-profile/organization-profile"
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
  downloadurl;
  downloadurlLogo;
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


    this.IRmethods.getOrgProfile().then((data: any) => {
      this.name = data.name;
      this.category = data.category;
      this.cell = data.cell;
      this.address = data.address;
      this.desc = data.desc;
      this.downloadurl = data.downloadurl;
      this.downloadurlLogo = data.downloadurlLogo;
      this.email = data.email;
      this.contact = data.contact;
      console.log(this.contact)

      console.log(data)
      // console.log(this.downloadurlLogo)
    })

  }

  ionViewWillEnter() {
    // this.initMap() ;
    this.getGallery();

    this.IRmethods.getOrgProfile().then((data: any) => {
      this.name = data.name;
      this.category = data.category;
      this.cell = data.cell;
     // this.address = data.address;
      this.desc = data.desc;
      this.downloadurl = data.downloadurl;
      this.downloadurlLogo = data.downloadurlLogo;
      this.email = data.email;
      this.contact = data.contact;
      console.log(this.contact)

      console.log(data)
      // console.log(this.downloadurlLogo)
    })
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


    this.IRmethods.logout().then(() => {
      this.navCtrl.push(RegisterPage, { out: 'logout' });
    }, (error) => {
      console.log(error.message);
    })


    // const prompt = this.alertCtrl.create({
    //   title: 'Login',
    //   message: "Enter a name for this new album you're so keen on adding",
    //   inputs: [
    //     {
    //       name: 'title',
    //       placeholder: 'Title'
    //     },
    //   ],
    //   buttons: [
    //     {
    //       text: 'Cancel',
    //       handler: data => {
    //         console.log('Cancel clicked');
    //       }
    //     },
    //     {
    //       text: 'Save',
    //       handler: data => {
    //         console.log('Saved clicked');
    //       }
    //     }
    //   ]
    // });
    // prompt.present();


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

    var contentString = '<div id="content">'+
    '<div id="siteNotice">'+
    '</div>'+
    '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
    '<div id="bodyContent">'+
    '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
    'sandstone rock formation in the southern part of the '+
    'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
    'south west of the nearest large town, Alice Springs; 450&#160;km '+
    '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
    'features of the Uluru - Kata Tjuta National Park. Uluru is '+
    'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
    'Aboriginal people of the area. It has many springs, waterholes, '+
    'rock caves and ancient paintings. Uluru is listed as a World '+
    'Heritage Site.</p>'+
    '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
    'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
    '(last visited June 22, 2009).</p>'+
    '</div>'+
    '</div>'; 

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    }); 

    marker.addListener('click', function() {
      infowindow.open(map, marker);
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
        position: { lat: parseFloat(this.orgArray[index].lat), lng: parseFloat(this.orgArray[index].long) },
        label: name,
        zoom: 8,
        styles: this.mapStyles

      });

      this.showMultipleMarker.addListener('click', () => {

       console.log(this.orgArray[index]);

        
        console.log(index);
        this.navCtrl.push(OrganizationProfilePage, { orgObject: this.orgArray[index] });
      });

    }
  }


  // initMap() {
  //   console.log(this.orgArray);
  //   console.log(this.lat)
  //   console.log(this.lng)
  //   if (this.orgArray.length != 0){
  //   setTimeout(() => {
  //     let myLatLng = {
  //       lat: this.orgArray[0].lat,
  //       lng: this.orgArray[0].long
  //     };
  //     let map = new google.maps.Map(document.getElementById("map"), {
  //       zoom: 9,
  //       center: myLatLng,
  //       disableDefaultUI: true,
  //       styles: [
  //         {
  //           elementType: "geometry",
  //           stylers: [
  //             {
  //               color: "#1d2c4d"
  //             }
  //           ]
  //         },
  //         {
  //           elementType: "labels.text.fill",
  //           stylers: [
  //             {
  //               color: "#8ec3b9"
  //             }
  //           ]
  //         },
  //         {
  //           elementType: "labels.text.stroke",
  //           stylers: [
  //             {
  //               color: "#1a3646"
  //             }
  //           ]
  //         },
  //         {
  //           featureType: "administrative.country",
  //           elementType: "geometry.stroke",
  //           stylers: [
  //             {
  //               color: "#4b6878"
  //             }
  //           ]
  //         },
  //         {
  //           featureType: "administrative.land_parcel",
  //           elementType: "labels.text.fill",
  //           stylers: [
  //             {
  //               color: "#64779e"
  //             }
  //           ]
  //         },
  //         {
  //           featureType: "administrative.province",
  //           elementType: "geometry.stroke",
  //           stylers: [
  //             {
  //               color: "#4b6878"
  //             }
  //           ]
  //         },
  //         {
  //           featureType: "landscape.man_made",
  //           elementType: "geometry.stroke",
  //           stylers: [
  //             {
  //               color: "#334e87"
  //             }
  //           ]
  //         },
  //         {
  //           featureType: "landscape.natural",
  //           elementType: "geometry",
  //           stylers: [
  //             {
  //               color: "#023e58"
  //             }
  //           ]
  //         },
  //         {
  //           featureType: "poi",
  //           elementType: "geometry",
  //           stylers: [
  //             {
  //               color: "#283d6a"
  //             }
  //           ]
  //         },
  //         {
  //           featureType: "poi",
  //           elementType: "labels.text.fill",
  //           stylers: [
  //             {
  //               color: "#6f9ba5"
  //             }
  //           ]
  //         },
  //         {
  //           featureType: "poi",
  //           elementType: "labels.text.stroke",
  //           stylers: [
  //             {
  //               color: "#1d2c4d"
  //             }
  //           ]
  //         },
  //         {
  //           featureType: "poi.park",
  //           elementType: "geometry.fill",
  //           stylers: [
  //             {
  //               color: "#023e58"
  //             }
  //           ]
  //         },
  //         {
  //           featureType: "poi.park",
  //           elementType: "labels.text.fill",
  //           stylers: [
  //             {
  //               color: "#3C7680"
  //             }
  //           ]
  //         },
  //         {
  //           featureType: "road",
  //           elementType: "geometry",
  //           stylers: [
  //             {
  //               color: "#304a7d"
  //             }
  //           ]
  //         },
  //         {
  //           featureType: "road",
  //           elementType: "labels.text.fill",
  //           stylers: [
  //             {
  //               color: "#98a5be"
  //             }
  //           ]
  //         },
  //         {
  //           featureType: "road",
  //           elementType: "labels.text.stroke",
  //           stylers: [
  //             {
  //               color: "#1d2c4d"
  //             }
  //           ]
  //         },
  //         {
  //           featureType: "road.highway",
  //           elementType: "geometry",
  //           stylers: [
  //             {
  //               color: "#2c6675"
  //             }
  //           ]
  //         },
  //         {
  //           featureType: "road.highway",
  //           elementType: "geometry.stroke",
  //           stylers: [
  //             {
  //               color: "#255763"
  //             }
  //           ]
  //         },
  //         {
  //           featureType: "road.highway",
  //           elementType: "labels.text.fill",
  //           stylers: [
  //             {
  //               color: "#b0d5ce"
  //             }
  //           ]
  //         },
  //         {
  //           featureType: "road.highway",
  //           elementType: "labels.text.stroke",
  //           stylers: [
  //             {
  //               color: "#023e58"
  //             }
  //           ]
  //         },
  //         {
  //           featureType: "transit",
  //           elementType: "labels.text.fill",
  //           stylers: [
  //             {
  //               color: "#98a5be"
  //             }
  //           ]
  //         },
  //         {
  //           featureType: "transit",
  //           elementType: "labels.text.stroke",
  //           stylers: [
  //             {
  //               color: "#1d2c4d"
  //             }
  //           ]
  //         },
  //         {
  //           featureType: "transit.line",
  //           elementType: "geometry.fill",
  //           stylers: [
  //             {
  //               color: "#283d6a"
  //             }
  //           ]
  //         },
  //         {
  //           featureType: "transit.station",
  //           elementType: "geometry",
  //           stylers: [
  //             {
  //               color: "#3a4762"
  //             }
  //           ]
  //         },
  //         {
  //           featureType: "water",
  //           elementType: "geometry",
  //           stylers: [
  //             {
  //               color: "#0e1626"
  //             }
  //           ]
  //         },
  //         {
  //           featureType: "water",
  //           elementType: "labels.text.fill",
  //           stylers: [
  //             {
  //               color: "#4e6d70"
  //             }
  //           ]
  //         }
  //       ]
  //     });
  //     var indx = 0;

  //     for (var x = 0; x < this.orgArray.length; x++) {
  //       if (this.orgArray[x].Category =="Higher Education Institution") indx = 1;
  //       else if (this.orgArray[x].Category == "Library") indx = 2;
  //       else if (this.orgArray[x].Category == "Learning Center") indx = 3;
  //       else if (this.orgArray[x].Category =="InterCafe") indx = 4;
  //       else if (this.orgArray[x].Category == "Mall") indx = 5;
  //       else if (this.orgArray[x].Category == "Coffee Shop") indx = 6;




  //       console.log("inside");
  //       let myLatLng = {
  //         lat: this.orgArray[x].lat,
  //         lng: this.orgArray[x].long
  //       };
  //       console.log(myLatLng);

  //       let marker = new google.maps.Marker({
  //         position: myLatLng,
  //         icon: this.icon[indx],
  //         size: { width: 5, height: 5 },
  //         map: map,
  //         title: this.orgArray[x].name
  //       });

  //       let infowindow = new google.maps.InfoWindow({
  //         content:
  //           '<div style="width: 400px; transition: 300ms;"><b>' +
  //           this.orgArray[x].name +
  //           '</b><div style="display: flex; padding-top: 10px;">' +
  //           '<img style="height: 100px; width: 100px; object-fit: cober; border-radius: 50px;" src=' +
  //           this.orgArray[x].downloadurl +
  //           ">" +
  //           '<p style="padding-left: 10px;padding-right: 10px">' +
  //           this.orgArray[x].desc +
  //           "</p><br>" +
  //           "<br></div>"
  //       });

  //       marker.addListener("click", function() {
  //         infowindow.open(map, marker);
  //         map.setZoom(13);
  //         map.setCenter(marker.getPosition());
  //       });
  //     }
  //   }, 3000);

  //   console.log("at the end");
  // }
  // }


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
    // var y = document.getElementsByClassName("gallery") as HTMLCollectionOf<HTMLElement>;
    var x = document.getElementsByClassName("adder") as HTMLCollectionOf<HTMLElement>;
    if (this.v == 0) {
      // y[0].style.right = "10px";

      setTimeout(() => {
        x[0].style.display = "block";
      }, 300);
      this.v = 1;
    } else {
      // x[0].style.display = "none"
      // y[0].style.right = "-260px";

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

  v;
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
