import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IrMethodsProvider } from '../../providers/ir-methods/ir-methods';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';



declare var google;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
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
  name;
  cell;
  category;
  address;
  desc;
  downloadurl;
  downloadurlLogo;
  email
  constructor(public navCtrl: NavController,public IRmethods: IrMethodsProvider) {
    this.IRmethods.getAllOrganizations().then((data: any) => {
      this.orgArray = data;
      console.log(data);
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


    this.IRmethods.getOrgProfile().then((data:any) => {
      this.name = data.name;
      this.category = data.category;
      this.cell = data.cell;
      this.address = data.address;
      this.desc = data.desc;
      this.downloadurl = data.downloadurl;
      this.downloadurlLogo = data.downloadurlLogo;
      this.email = data.email;

      console.log(data)
    })

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
    this.initMap()
  }
  initMap() {
    console.log(this.lng)
    const options = {
      center: { lat: this.lat, lng: this.lng },
      zoom: 14,
      disableDefaultUI: true,
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);

    // adding user marker to the map 
    this.marker = new google.maps.Marker({
      map: this.map,
      zoom: 10,
      position: this.map.getCenter()
      //animation: google.maps.Animation.DROP,
    });

    setTimeout(() => {
      this.markers();
    }, 4000)


    console.log("test");


  }
  markers() {
    console.log(this.orgArray);
    for (let index = 0; index < this.orgArray.length; index++) {
      var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/'
      this.showMultipleMarker = new google.maps.Marker({
        map: this.map,
        //  icon: this.icon,
        position: { lat: parseFloat(this.orgArray[index].lat), lng: parseFloat(this.orgArray[index].long) },
        label: name,
        zoom: 8,

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
    let arrow = document.getElementById("myArrow");

    // arrow[0].style.left = "48%";
    // arrow[0].style.transform = "translateX(-60%)";
    arrow.style.transform = "rotateZ(180deg)";
    // arrow[0].style.transform = "translateX(-50%)";
    slider[0].style.bottom = "0";
    blurMap.style.filter = "blur(3px)";
    this.state = 1;
  }
  hideSlide() {
    var blurMap = document.getElementById("map");
    // let slider = document.getElementsByClassName("absolutely") as HTMLCollectionOf<HTMLElement>;
    // let arrow = document.getElementById("myArrow");

    // arrow[0].style.left = "48%";
    // arrow[0].style.transform = "translateX(-60%)";
    // arrow[0].style.transform = "rotateZ(0DEG)";
    // slider[0].style.bottom = "-180px";
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
  addContributes(){

    if(this.title  == null || this.title == "" || this.title == undefined){
      this.title = " "
      this.pullDown();
    }
    if(this.description == null || this.description == " " || this.description == "" || this.description == undefined ){
      // swal("Please state your organisational needs in the fields provided");
    }
    else{
  
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
