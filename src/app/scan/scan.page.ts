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
 
  async testClick(){

    var barcode = '8411126046384';
    this.db.collection('products').doc(barcode).valueChanges().subscribe(val => console.log(val));

    

  }

   async scanBarcode(){

    this.options = {
      showFlipCameraButton : true,
      showTorchButton: true
    }

     this.results = await this.barcode.scan(this.options);
     let dataObj = JSON.stringify(this.results);
     this.router.navigate(['product', dataObj]);
   }
  
   ngOnInit() {
   }

}
