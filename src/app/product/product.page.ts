import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController} from '@ionic/angular';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore'
import { UserService } from '../user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { database } from 'firebase';
import { query } from '@angular/core/src/render3';


@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  id: any;
  results : {};
  dataObj: any;
  barcode : String;
  returnedQuery: any;
  
  constructor(public route: ActivatedRoute, public navCtrl: NavController, private afs: AngularFirestore, private fire: AngularFireAuth, private alertCtrl: AlertController, private user: UserService) {}
   

  ngOnInit() {
    console.log("Product Page")
    this.loadData()
  }

  async query(barcode){

    this.returnedQuery = this.afs.collection('products').doc(barcode).valueChanges().subscribe(val => console.log(val));
    
  }

  async loadData(){
    let passedProduct = this.route.snapshot.paramMap.get('dataObj');
    this.dataObj = JSON.parse(passedProduct);

    let barcode = this.dataObj.text;

    this.returnedQuery = this.afs.collection('products').doc(barcode).valueChanges().subscribe(val => this.returnedQuery = val);
    console.log(this.returnedQuery);


  }

  

}
