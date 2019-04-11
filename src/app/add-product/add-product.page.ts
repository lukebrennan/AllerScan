import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { AngularFirestore } from '@angular/fire/firestore'

import { AlertController, BooleanValueAccessor}  from '@ionic/angular'
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { getCurrentDirectiveDef } from '@angular/core/src/render3/state';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {

  productName: string = ""
  productCode: string = ""
  eggAllergy: boolean = false
  shellfishAllergy: boolean = false
  dairyAllergy: boolean = false
  nutAllergy: boolean = false
  glutenAllergy: boolean = false

  constructor(public afAuth: AngularFireAuth, public alert: AlertController, public afstore: AngularFirestore, public router: Router) { }


  async addProduct(){
    const {productName, productCode, eggAllergy, shellfishAllergy, dairyAllergy, nutAllergy, glutenAllergy} = this

    
    try{
  

      this.afstore.doc(`products/${productCode}`).set({
        productName,
        productCode,
        shellfishAllergy,
        dairyAllergy,
        eggAllergy,
        nutAllergy,
        glutenAllergy
      })

      this.showAlert("Success!", "Product Added")
      this.router.navigate(['/tabs'])



    } catch(error){
      console.dir(error)
      this.showAlert("Error", error.message)
    }
    

   }

   async showAlert(header: string, message: string){
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["Okay"]
    })
    
    await alert.present()

   }

  ngOnInit() {
  }

}
