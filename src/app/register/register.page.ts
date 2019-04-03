import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { AngularFirestore } from '@angular/fire/firestore'

import { AlertController}  from '@ionic/angular'
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email: string = ""
  password: string = ""
  cpassword: string = ""

  constructor(public afAuth: AngularFireAuth, public alert: AlertController, public afstore: AngularFirestore, public user: UserService, public router: Router) { }

  ngOnInit() {
  }

  async register(){
    const {email, password, cpassword } = this
    if(password !== cpassword)
    {
      this.showAlert("Error", "Passwords must match")
      return console.error("Passwords do not match!")
    }

    try{
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
  
      this.afstore.doc(`users/${res.user.uid}`).set({
        email
      })

      this.user.setUser({
        email,
        uid: res.user.uid
      })

      this.showAlert("Success!", "Welcome to AllerScan")
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

}
