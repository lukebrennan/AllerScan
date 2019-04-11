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
 
   async scanBarcode(){

    this.options = {
      showFlipCameraButton : true,
      showTorchButton: true
    }

     this.results = await this.barcode.scan(this.options);
     this.findBarcode(this.results);
   }
 
   async findBarcode(results){

    console.log(this.results);
    this.router.navigate(['/item', results])



   }
 
   ngOnInit() {
   }

}
