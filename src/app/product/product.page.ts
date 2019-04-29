import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController} from '@ionic/angular';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore'
import { UserService } from '../user.service';
import {ActionSheetController} from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { database, firestore } from 'firebase';
import { query } from '@angular/core/src/render3';
import * as _ from 'lodash';


@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  uid: any;
  results : {};
  dataObj: any;
  barcode : String;
  productSafe: boolean;
  productResults: any;
  productInfo: any;
  userPrefs: any;

  logName: string = ""
  logSafe: string = ""
  logDate: any;

  
  constructor(private router: Router, private actionSheet: ActionSheetController, public route: ActivatedRoute, public navCtrl: NavController, private afs: AngularFirestore, private fire: AngularFireAuth, private alertCtrl: AlertController, private user: UserService, public alert: AlertController) {}
   

  ngOnInit() {
    console.log("Product Page")
    
    //get User ID and barcode which was scanned
    this.uid = this.user.getUID();
    let passedProduct = this.route.snapshot.paramMap.get('dataObj');
    this.dataObj = JSON.parse(passedProduct);
    let barcode = this.dataObj.text;

    
    //Determine if a products allergens matches a users allergen preferences and return
    this.afs.collection('products').doc(barcode).valueChanges().subscribe((product:any) => {
      this.productResults = product;

      if(this.productResults == null)
      {
        this.showAlert("Product Not Found", "Would you like to add it now?")
        console.log("Product Not Found");
      }
else{
      this.afs.collection('users').doc(this.uid).valueChanges().subscribe((prefs:any) => {
          this.productSafe = true;
          let allergens = ['dairyAllergy', 'eggAllergy', 'glutenAllergy', 'nutAllergy', 'shellfishAllergy'];
  
          let allergens_product =  _.keys(_.pickBy(_.pick(this.productResults, allergens)));
          let allergens_prefs = _.keys(_.pickBy(_.pick(prefs, allergens)));
          let comparison = _.intersection(allergens_product, allergens_prefs)
  
          if (comparison.length) {
              this.productSafe = false;
              //console.log('Not safe! '+ comparison.toString());
              console.log("Product Found");

              }

              if(this.productSafe == true)
              {
                this.addToLog(this.productSafe, this.productResults);
              }
              else if(this.productSafe == false)
              {
                this.addToLog(this.productSafe, this.productResults);
              }

      });
    }
  });
  


   
    //Query firestore database to return information on current user and scanned product
    this.productInfo = this.afs.collection('products').doc(barcode).valueChanges().subscribe(val => this.productInfo = val);
    this.userPrefs = this.afs.collection('users').doc(this.uid).valueChanges().subscribe(val => this.userPrefs = val);



  }

  async addToLog(productSafe, productResults)
  {
    if(productSafe == false)
    {
      let logSafe = "NOT SAFE";
      let logName = productResults.productName;
      let logDate = new Date();
      this.afs.collection('logs').doc(this.uid).update({
        logs: firestore.FieldValue.arrayUnion({
          logSafe,
          logName,
          logDate
        })
      })
    }
    else(productSafe == true)
    {
      let logSafe = "SAFE";
      let logName = productResults.productName;
      let logDate = new Date();
      this.afs.collection('logs').doc(this.uid).update({
        logs: firestore.FieldValue.arrayUnion({
          logSafe,
          logName,
          logDate
        })
      })
    }
  }


  async showAlert(header: string, message: string){
    const alert = await this.alert.create({
      header,
      message,
      buttons: [{
        text: 'Cancel',
        role: 'Cancel',
        handler: () => {
          this.router.navigate(['/tabs'])
        }
      },
      {
        text: 'Yes',
        role: 'Yes',
        handler: () => {
          this.router.navigate(['/add-product'])
        }
      }
    
    
    ]
    })
  
    await alert.present()
}
}
