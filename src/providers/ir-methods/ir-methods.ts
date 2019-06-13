import { Injectable, NgZone } from '@angular/core';
import { LoadingController, AlertController, UrlSerializer, registerModeConfigs } from "ionic-angular";
declare var firebase;
declare var google;
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
  downloadurLLogo ;
  promArray 
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
                orgName:details[keys[x]].prograName,
                applicationLink: details[keys[x]].applicationLink,
               city: details[keys[x]].city,
               closeApplicationDate: details[keys[x]].closeApplicationDate,
               eligibleCreteria: details[keys[x]].eligibleCreteria,
               email: details[keys[x]].email,
               facebook: details[keys[x]].facebook,
               fullDescription: details[keys[x]].fullDescription,
               intro: details[keys[x]].intro,
               lat: details[keys[x]].lat,
               long:details[keys[x]].long ,
               id: keys[x],
               objectives:details[keys[x]].objectives,
            
               openApplicationDate:details[keys[x]].openApplicationDate,
               additionalBenefits: details[keys[x]].additionalBenefits,
               programBenefits:details[keys[x]].programBenefits ,
               programCategory:details[keys[x]].programCategory ,
               programCloseDate:details[keys[x]].programCloseDate ,
               programStartDate:details[keys[x]].programStartDate ,
               programType:details[keys[x]].programType ,
               programmeService:details[keys[x]].programmeService ,
               promPhone:details[keys[x]].promPhone ,
               targetAudience:details[keys[x]].targetAudience ,
               twitter:details[keys[x]].twitter ,
               img: details[keys[x]].downloadurl,
               address: details[keys[x]].address ,
               logo: details[keys[x]].downloadurlLogo,
            
              }
              this.storeOrgNames(details[keys[x]].programCategory);
              this.orgArray.push(orgObject)
              console.log(details[keys[x]].programCategory)
            }
            resolve(this.orgArray)
          }
        });
      })
    })
  }


  storeOrgNames(cat) {
    this.orgNames.push(cat);

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


  getproInfor() {
    return new Promise((accpt, rej) => {
      let user = firebase.auth().currentUser;
      console.log(user.uid)
      firebase.database().ref("Users/"+"Cms_Users/"+user.uid).on('value', (data: any) => {
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




  // getProgramme() {
  //   return new Promise((accpt, rej) => {
  //     let user = firebase.auth().currentUser;
  //     console.log(user.uid)
  //     firebase.database().ref("4IR_Hubs/" + user.uid).on('value', (data: any) => {
  //       let details = data.val();
  //       console.log(details)
  //       let keys = Object.keys(details)
  //       for (var x = 0; x < keys.length; x++) {
          
  //       firebase.database().ref("4IR_Hubs/" + keys[x]).on('value', (data2: any) => {
  //         let details2 = data.val();
  //         console.log(keys[x])
  //         let keys2 = Object.keys(details2)
  //         console.log(keys2)
  //         var orgObject = {
  //           orgName:details[keys2[x]].prograName,
  //           applicationLink: details[keys2[x]].applicationLink,
  //            city: details[keys2[x]].city,
  //            closeApplicationDate: details[keys2[x]].closeApplicationDate,
  //            eligibleCreteria: details[keys2[x]].eligibleCreteria,
  //            email: details[keys2[x]].email,
  //            facebook: details[keys2[x]].facebook,
  //            fullDescription: details[keys2[x]].fullDescription,
  //            intro: details[keys2[x]].intro,
  //            lat: details[keys2[x]].lat,
  //            long:details[keys2[x]].long ,
  //            id: keys2[x],
  //            objectives:details[keys2[x]].objectives,
  //            // wifi:wifi,
  //            openApplicationDate:details[keys2[x]].openApplicationDate,
  //            additionalBenefits: details[keys2[x]].additionalBenefits,
  //            programBenefits:details[keys2[x]].programBenefits ,
  //            programCategory:details[keys2[x]].programCategory ,
  //            programCloseDate:details[keys2[x]].programCloseDate ,
  //            programStartDate:details[keys2[x]].programStartDate ,
  //            programType:details[keys2[x]].programType ,
  //            programmeService:details[keys2[x]].programmeService ,
  //            promPhone:details[keys2[x]].promPhone ,
  //            targetAudience:details[keys2[x]].targetAudience ,
  //            twitter:details[keys2[x]].twitter ,
  //            img: details[keys2[x]].downloadurl,
  //            address: details[keys2[x]].address ,
  //            logo: details[keys2[x]].downloadurlLogo,
  //           //  rating :  totRating
  //          }

  //          this.promArray.push(orgObject)
  //          console.log(this.promArray)
        
  //         accpt( this.promArray)
  //       })
      
  //     }
    
  //   })
 
  
  // })
  // }

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


 getLocation(lat, lng) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        var geocoder = new google.maps.Geocoder;
        var latlng = { lat: parseFloat(lat), lng: parseFloat(lng) };
        geocoder.geocode({ 'location': latlng }, function (results, status) {
          var address = results[0].address_components[3].short_name;
          console.log(address);
          console.log(results[0]);
          resolve(address)
        }, 4000);

      })


    })
  }

}