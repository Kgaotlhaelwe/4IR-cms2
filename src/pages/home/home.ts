import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

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
    var theGal = document.getElementsByClassName("gallery") as HTMLCollectionOf<HTMLElement>;
    prof[0].style.display = "block";
    profil[0].style.opacity = "1";
    theGal[0].style.opacity = "1";
  }

  closeDIV() {
    var x = document.getElementsByClassName("overlay") as HTMLCollectionOf<HTMLElement>;
    var bg = document.getElementsByClassName("cont") as HTMLCollectionOf<HTMLElement>;
    var imgs = document.getElementsByClassName("gallery") as HTMLCollectionOf<HTMLElement>;
    imgs[0].style.filter = "blur(0)";
    imgs[0].style.opacity = "1"
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

  v;
  closeProfile() {
    // alert("clicked")

    this.hideSlide();
    var prof = document.getElementsByClassName("profOverlay") as HTMLCollectionOf<HTMLElement>;
    var blurMap = document.getElementById("map");
    var profil = document.getElementsByClassName("cont") as HTMLCollectionOf<HTMLElement>;
    var y = document.getElementsByClassName("gallery") as HTMLCollectionOf<HTMLElement>;
    var q = document.getElementsByClassName("adder") as HTMLCollectionOf<HTMLElement>;
    blurMap.style.filter = "blur(0px)";
    y[0].style.right = "-260px";
    y[0].style.opacity = "0";
    q[0].style.display = "none";
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
