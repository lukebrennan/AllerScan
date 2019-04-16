import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController} from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore'
import { UserService } from '../user.service';
import { AngularFireAuth } from '@angular/fire/auth';

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
  

  constructor(public route: ActivatedRoute, public navCtrl: NavController, private database: AngularFirestore, private fire: AngularFireAuth, private alertCtrl: AlertController) {}
   

  ngOnInit() {
    console.log("Product Page")
    this.loadData()
  }

  async query(barcode: String){


  }

  async loadData(){
    let passedProduct = this.route.snapshot.paramMap.get('dataObj');
    this.dataObj = JSON.parse(passedProduct);

    console.log(this.dataObj.text);

    let barcode = this.dataObj.text;

    this.returnedQuery = this.query(barcode);
    console.log(this.barcode);


  }

  

}
