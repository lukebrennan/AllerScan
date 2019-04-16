import { Component, OnInit } from '@angular/core';
import {BarcodeScanner, BarcodeScannerOptions} from '@ionic-native/barcode-scanner/ngx'
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {

  options: BarcodeScannerOptions;
  results: {};
 
  constructor(private barcode : BarcodeScanner, public navCtrl : NavController, public router: Router){}
 
  async testClick(){

    this.results = 1;
    this.router.navigate(['product', this.results]);
  }

   async scanBarcode(){

    this.options = {
      showFlipCameraButton : true,
      showTorchButton: true
    }

     this.results = await this.barcode.scan(this.options);
     let dataObj = JSON.stringify(this.results);
     console.log('scan.page.ts', typeof(this.results))
     this.router.navigate(['product', dataObj]);
   }
  
   ngOnInit() {
   }

}
