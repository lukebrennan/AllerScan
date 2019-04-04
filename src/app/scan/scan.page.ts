import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {BarcodeScanner, BarcodeScannerOptions} from '@ionic-native/barcode-scanner/ngx'
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {

  options: BarcodeScannerOptions;
  results: {};
 
  constructor(private barcode : BarcodeScanner, public navCtrl : NavController){
    
  }
 
   async scanBarcode(){

    this.options = {
      showFlipCameraButton : true,
      showTorchButton: true
    }

     this.results = await this.barcode.scan(this.options);
     console.log(this.results);
     return this.results;
   }
 
 
   ngOnInit() {
   }

}
