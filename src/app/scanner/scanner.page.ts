import { Component, OnInit } from '@angular/core';

import {BarcodeScanner, BarcodeScannerOptions} from '@ionic-native/barcode-scanner/ngx'
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {

 options: BarcodeScannerOptions;
 results: {};

 constructor(private barcode : BarcodeScanner, public navCtrl : NavController){
   
 }

  async scanBarcode(){
    this.results = await this.barcode.scan();
    console.log(this.results);
    return this.results;
  }


  ngOnInit() {
  }
  

}
 