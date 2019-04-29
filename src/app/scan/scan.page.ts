import { Component, OnInit } from '@angular/core';
import {BarcodeScanner, BarcodeScannerOptions} from '@ionic-native/barcode-scanner/ngx'
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore'


@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {

  options: BarcodeScannerOptions;
  results: {};
 
  constructor(private db: AngularFirestore, private barcode : BarcodeScanner, public navCtrl : NavController, public router: Router){}
 
  //For testing products on browser instead of mobile
  async testClick(){

    var barcode = '8411126046384';
    this.db.collection('products').doc(barcode).valueChanges().subscribe(val => console.log(val));
  }

   async scanBarcode(){

    this.options = {
      showFlipCameraButton : true,
      showTorchButton: true
    }

     //this.results = await this.barcode.scan(this.options);
     //let dataObj = JSON.stringify(this.results);
     //this.router.navigate(['product', dataObj]);

     this.barcode.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      let dataObj = JSON.stringify(barcodeData);
      this.router.navigate(['product', dataObj]);
     }).catch(err => {
         console.log('Error', err);
     });


   }
  
   ngOnInit() {
   }

}
