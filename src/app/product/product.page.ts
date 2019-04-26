import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController} from '@ionic/angular';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore'
import { UserService } from '../user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { database } from 'firebase';
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
  returnedQuery: any;
  productSafe: boolean;
  productResults: any;

  
  constructor(public route: ActivatedRoute, public navCtrl: NavController, private afs: AngularFirestore, private fire: AngularFireAuth, private alertCtrl: AlertController, private user: UserService) {}
   

  ngOnInit() {
    console.log("Product Page")
    this.loadData()
  }

  async loadData(){

    this.uid = this.user.getUID();
    let passedProduct = this.route.snapshot.paramMap.get('dataObj');
    this.dataObj = JSON.parse(passedProduct);
    let barcode = this.dataObj.text;


    this.afs.collection('products').doc(barcode).valueChanges().subscribe((product:any) => {
      this.productResults = product;
      this.afs.collection('users').doc(this.uid).valueChanges().subscribe((prefs:any) => {
          this.productSafe = true;
          let allergens = ['dairyAllergy', 'eggAllergy', 'glutenAllergy', 'nutAllergy', 'shellfishAllergy'];
  
          let allergens_product =  _.keys(_.pickBy(_.pick(this.productResults, allergens)));
          let allergens_prefs = _.keys(_.pickBy(_.pick(prefs, allergens)));
          let comparison = _.intersection(allergens_product, allergens_prefs)
  
          if (comparison.length) {
              this.productSafe = false;
              console.log('Not safe! '+ comparison.toString());
          }
      });
  });

   
    //Query firestore database to return information on current user 
    //this.userPrefs = this.afs.collection('users').doc(this.uid).valueChanges().subscribe(val => this.userPrefs = val);



  }

  

}
