import { Injectable, NgZone } from '@angular/core';
import { LoadingController, AlertController, UrlSerializer, registerModeConfigs } from "ionic-angular";
declare var firebase;
/*
  Generated class for the 4IrMethodsProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class IrMethodsProvider {
  stayLoggedIn;
  orgArray = new Array();
  detailArray = new Array();
  orgNames = new Array();
  profileArr = new Array();
  ProfileArr = new Array();
  url;
  downloadurLLogo
  constructor(private ngzone: NgZone, public loadingCtrl: LoadingController, public alertCtrl: AlertController, ) {

    console.log('Hello 4IrMethodsProvider Provider');
  }

  checkstate() {
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user != null) {
            this.stayLoggedIn = 1
          }
          else {
            this.stayLoggedIn = 0
          }
          resolve(this.stayLoggedIn)
        })
      })
    })
  }
  GetUserProfile() {
    return new Promise((accpt, rejc) => {
      this.ngzone.run(() => {
        let user = firebase.auth().currentUser
        firebase.database().ref("4IR_Hubs/" + user.uid).on("value", (data: any) => {
          let DisplayData = data.val();
          let keys = Object.keys(DisplayData);
          if (DisplayData !== null) {
          }
          for (var i = 0; i < keys.length; i++) {
            this.storeImgur(DisplayData[keys[i]].downloadurl);
            this.storeImgur2(DisplayData[keys[i]].downloadurlLogo);
            console.log(DisplayData[keys[i]].downloadurl)
          }
          accpt(DisplayData);
        }, Error => {
          rejc(Error.message)
        })
      })
    })
  }

  storeImgur(url) {
    this.url = url;
    console.log(this.url)
  }
  storeImgur2(downloadurLLogo) {
    this.downloadurLLogo = downloadurLLogo;
    console.log(this.url)
  }


  register(email, psswrd, lat, long, region, cell, category, Orgname, desc, service, address) {
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        let loading = this.loadingCtrl.create({
          spinner: "bubbles",
          content: "Signing in....",
        });
        loading.present();
        return firebase.auth().createUserWithEmailAndPassword(email, psswrd).then(newUser => {
          var user = firebase.auth().currentUser;
          firebase
            .database()
            .ref("4IR_Hubs/" + user.uid)
            .set({
              name: Orgname,
              email: email,
              contact: cell,
              category: category,
              desc: desc,
              long: long,
              lat: lat,
              region: region,
              downloadurl: "assets/download.png",
              downloadurlLogo: "assets/download.png",
              service: [service],
              address: address
            });
          var user = firebase.auth().currentUser;
          user.sendEmailVerification().then(function () {
            // Email sent.
          }).catch(function (error) {
            // An error happened.
          });
          resolve();
          setTimeout(() => {
            loading.dismiss();
          }, 100);
        })
          .catch(error => {
            loading.dismiss();
            const alert = this.alertCtrl.create({
              subTitle: error.message,
              buttons: [
                {
                  text: "OK",
                  handler: data => {
                    console.log("Cancel clicked");
                  }
                }
              ]
            });
            alert.present();
            console.log(error);
          });
      });
    });
  }


  // signUp(email, password) {
  //   var user = firebase.auth().currentUser;
  //   return new Promise((resolve, reject) => {
  //     firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
  //       firebase
  //     .database()
  //     .ref("Users/"+"Cms_Users/"+user.uid)
  //     .set({
  //       email:email ,  

  //     })
  //  resolve()
  //     }).catch((error) => {
  //       reject(error)
  //     })

  //   })
  // }

  signUp(email, password) {
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        let loading = this.loadingCtrl.create({
          spinner: 'bubbles',
          content: 'Please wait...',
          duration: 4000000
        });
        loading.present();
        return firebase.auth().createUserWithEmailAndPassword(email, password).then((newUser) => {
          var user = firebase.auth().currentUser
          console.log(user)
          firebase.database().ref("Users/"+"Cms_Users/"+user.uid).set({      
            email: email,     
          })
          var user = firebase.auth().currentUser;
          // user.sendEmailVerification().then(function () {
          //   // Email sent.
          // }).catch(function (error) {
          //   // An error happened.
          // });
          resolve();
          loading.dismiss();
        }).catch((error) => {
          loading.dismiss();
          const alert = this.alertCtrl.create({
            // cssClass: 'myAlert',
            subTitle: error.message,
            buttons: [
              {
                text: 'ok',
                handler: data => {
                  console.log('Cancel clicked');
                }
              }
            ]
          });
          alert.present();
          console.log(error);
        })
      })
    })
  }

  addOrganisation(email, lat, long, region, cell, category, Orgname, desc, service, address, wifi, freeWifi, wifiRange, website) {
    var user = firebase.auth().currentUser;
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref("Users/"+"Cms_Users/"+user.uid)
        .set({
          name: Orgname,
          email: email,
          contact: cell,
          category: category,
          desc: desc,
          long: long,
          lat: lat,
          wifi: wifi,
          freeWifi: freeWifi,
          website: website,
          wifiRange: wifiRange,
          region: region,
          downloadurl: "assets/download.png",
          downloadurlLogo: "assets/download.png",
          service: [service],
          address: address,

        });
      resolve()
    })
  }

  addProgram(prograName,openApplicationDate , closeApplicationDate , programStartDate  , programCloseDate , programCategory , intro ,objectives, targetAudience , fullDescription, service,lat , long , city ,  address, programBenefits ,additionalBenefits, eligibleCreteria, applicationLink , promPhone , twitter, facebook,email ){
    var user = firebase.auth().currentUser;

    return new Promise((resolve , reject)=>{
      firebase.database().ref("4IR_Hubs/"+user.uid).set({
        prograName:prograName ,
        lat:lat ,
        long:long ,
        city:city ,
        address :address ,
        openApplicationDate:openApplicationDate ,
        closeApplicationDate:closeApplicationDate ,
        programStartDate:programStartDate ,
        programCloseDate:programCloseDate ,
      
        intro:intro ,
        objectives :objectives ,
        targetAudience:targetAudience ,
        fullDescription:fullDescription ,
        programCategory:programCategory ,
        programmeService:service ,
        programBenefits:programBenefits ,
        additionalBenefits:additionalBenefits ,
        eligibleCreteria:eligibleCreteria ,
        applicationLink:applicationLink ,
        promPhone:promPhone ,
        twitter:twitter ,
        facebook:facebook ,
        email:email ,
        downloadurl: "assets/download.png",
        downloadurlLogo: "assets/download.png",




      })

      resolve()
    })
  }
  checkVerification() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        console.log(user);
        if (user.emailVerified == false) {
          this.logout();
          resolve(0)
        }
        else {
          resolve(1)
        }
      })
    })
  }

  logout() {
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        firebase.auth().signOut();
        resolve()
      });
    })
  }

  SignIn(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  getAllOrganizations() {
    return new Promise((resolve, reject) => {
      this.ngzone.run(() => {
        var user = firebase.auth().currentUser;
        firebase.database().ref("4IR_Hubs").on("value", (data: any) => {
          if (data.val() != null) {
            this.orgArray.length = 0;
            this.orgNames.length = 0;
            let details = data.val();
            let keys = Object.keys(details);
            for (var x = 0; x < keys.length; x++) {
              let orgObject = {
                orgName: details[keys[x]].name,
                email: details[keys[x]].email,
                region: details[keys[x]].region,
                cell: details[keys[x]].contact,
                long: details[keys[x]].long,
                lat: details[keys[x]].lat,
                img: details[keys[x]].downloadurl,
                category: details[keys[x]].category,
                id: keys[x],
                desc: details[keys[x]].desc
              }
              this.storeOrgNames(details[keys[x]].name);
              this.orgArray.push(orgObject)
            }
            resolve(this.orgArray)
          }
        });
      })
    })
  }


  storeOrgNames(name) {
    this.orgNames.push(name);
    console.log(this.orgNames);

  }

  getOrgNames() {
    return this.orgNames
  }


  getCurrentLocation(lat, lng) {

    return new Promise((accpt, rej) => {

      console.log("provider outside getCurPos");
      this.createPositionRadius(lat, lng).then((data: any) => {
        accpt(data);
      })
    })

  }


  createPositionRadius(latitude, longitude) {
    var leftposition, rightposition, downposition, uposititon;
    return new Promise((accpt, rej) => {

      var downlat = new String(latitude);
      var latIndex = downlat.indexOf(".");
      var down = parseInt(downlat.substr(latIndex + 1, 2)) + 6;
      var down = parseInt(downlat.substr(latIndex + 1, 2)) + 12;
      if (down >= 100) {
        if (downlat.substr(0, 1) == "-") {
          var firstDigits = parseInt(downlat.substr(0, 3)) + 1;
        }
        else {
          var firstDigits = parseInt(downlat.substr(0, 2)) - 1;
        }
        var remainder = down - 100;
        if (remainder >= 10) {
          downposition = firstDigits + "." + remainder;
        }
        else {
          downposition = firstDigits + ".0" + remainder;
        }

      } else {
        if (downlat.substr(0, 1) == "-") {
          downposition = downlat.substr(0, 3) + "." + down;
        }
        else {
          downposition = downlat.substr(0, 2) + "." + down;
        }

      }

      //up  position
      var uplat = new String(latitude);
      var latIndex = uplat.indexOf(".");
      var up = parseInt(uplat.substr(latIndex + 1, 2)) - 6;
      var up = parseInt(uplat.substr(latIndex + 1, 2)) - 12;
      if (up <= 0) {
        if (uplat.substr(0, 1) == "-") {
          var firstDigits = parseInt(uplat.substr(0, 3)) + 1;
        }
        else {
          var firstDigits = parseInt(uplat.substr(0, 2)) - 1;
        }
        var remainder = down - 100;
        if (remainder >= 10) {
          uposititon = firstDigits + "." + remainder;
        }
        else {
          uposititon = firstDigits + ".0" + remainder;
        }
      } else {
        if (uplat.substr(0, 1) == "-") {
          uposititon = uplat.substr(0, 3) + "." + up;
        }
        else {
          uposititon = uplat.substr(0, 2) + "." + up;
        }

      }
      //left position
      var leftlat = new String(longitude);
      var longIndex = leftlat.indexOf(".");
      var left = parseInt(leftlat.substr(longIndex + 1, 2)) - 6;
      var left = parseInt(leftlat.substr(longIndex + 1, 2)) - 12;
      if (left >= 100) {
        if (leftlat.substr(0, 1) == "-") {
          var firstDigits = parseInt(leftlat.substr(0, 3)) - 1;
        } else {
          var firstDigits = parseInt(leftlat.substr(0, 2)) + 1;
        }
        var remainder = left - 100;
        leftposition = firstDigits + ".0" + remainder;
      } else {
        if (leftlat.substr(0, 1) == "-") {
          var firstDigits = parseInt(leftlat.substr(0, 3)) + 1;
        }
        else {
          var firstDigits = parseInt(leftlat.substr(0, 2)) - 1;
        }

        if (left == 0) {
          var remainder = 0;
        }
        else {
          var remainder = left - 12;
        }

        leftposition = firstDigits + ".0" + remainder;

      }
      //right position
      var rightlat = new String(longitude);
      var longIndex = rightlat.indexOf(".");
      var right = parseInt(rightlat.substr(longIndex + 1, 2)) + 6;
      var right = parseInt(rightlat.substr(longIndex + 1, 2)) + 12;
      if (right >= 100) {
        if (rightlat.substr(0, 1) == "-") {
          var firstDigits = parseInt(rightlat.substr(0, 3)) - 1;
        } else {
          var firstDigits = parseInt(rightlat.substr(0, 2)) + 1;
        }
        var remainder = right - 100;
        rightposition = firstDigits + ".0" + remainder;
      } else {
        rightposition = rightlat.substr(0, 2) + "." + right;
        if (left == 0) {
          var remainder = 0;
        }
        else {
          var remainder = left - 12;
        }

        rightposition = firstDigits + ".0" + remainder;
      }


      let radius = {
        left: leftposition,
        right: rightposition,
        up: uposititon,
        down: downposition
      }

      accpt(radius);

      // down  position


    })

  }


  loginx(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }
  
  getOrgProfile() {
    return new Promise((accpt, rej) => {
      let user = firebase.auth().currentUser;
      console.log(user.uid)
      firebase.database().ref("4IR_Hubs/" + user.uid).on('value', (data: any) => {
        let details = data.val();
        console.log(details)
        accpt(details)
        console.log(details)
      });

    })
  }




  forgetPassword(email) {

    return new Promise((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(email).then(() => {
        resolve();
      }, (error) => {
        reject(error)
      })

    })

  }

  uploadProfilePic(pic, name) {
    return new Promise((accpt, rejc) => {
      this.ngzone.run(() => {
        firebase.storage().ref(name).putString(pic, 'data_url').then(() => {
          accpt(name);
          console.log(name);
        }, Error => {
          rejc(Error.message)
        })
      })
    })
  }






  storeToDB1(name) {
    return new Promise((accpt, rejc) => {
      this.ngzone.run(() => {
        this.ProfileArr.length = 0;
        var storageRef = firebase.storage().ref(name);
        storageRef.getDownloadURL().then(url => {
          console.log(url)
          var userID = firebase.auth().currentUser;
          var link = url;
          firebase.database().ref("4IR_Hubs/" + userID.uid).update({
            downloadurl: link,
          });
          accpt('success');
        }, Error => {
          rejc(Error.message);
          console.log(Error.message);
        });
      })
    })
  }

  getUserID() {
    return new Promise((accpt, rejc) => {
      this.ngzone.run(() => {
        var user = firebase.auth().currentUser
        firebase.database().ref("4IR_Hubs/" + user.uid).on("value", (data: any) => {
          var profileDetails = data.val();
          if (profileDetails !== null) {
          }
          console.log(profileDetails);
          accpt(user.uid);
        }, Error => {
          rejc(Error.message)
        })
      })
    })
  }


  update(downloadurl, downloadurlLogo) {
    this.ProfileArr.length = 0;
    return new Promise((pass, fail) => {
      this.ngzone.run(() => {
        var user = firebase.auth().currentUser
        firebase.database().ref("4IR_Hubs/" + user.uid).update({
          downloadurlLogo: downloadurlLogo,
          downloadurl: downloadurl,


        });
      })
    })
  }



}