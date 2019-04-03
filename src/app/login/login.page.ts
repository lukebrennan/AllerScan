import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { UserService } from '../user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = ""
  password: string = ""
  constructor(public afAuth: AngularFireAuth, public user: UserService, public router: Router) { }

  ngOnInit() {
  }

  async login(){
    const{email, password} = this;
    try{
      const res = await this.afAuth.auth.signInWithEmailAndPassword(email, password)

          if(res.user){
            this.user.setUser({
              email,
              uid: res.user.uid
            })
          }
          this.router.navigate(['/tabs'])

    }catch(err){
      console.dir(err)
      if(err.code == "auth/user-not-found")
      {
        console.log("User not found")
      }
    }

  }

}
