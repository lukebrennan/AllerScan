import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userPrefs:any = {

    dairyAllergy : false,
    eggAllergy: false,
    email: "",
    glutenAllergy: false,
    nutAllergy: false,
    shellfishAllergy: false

  }
  uid: any;

  constructor(private afs: AngularFirestore, private user : UserService) { 

    //this.uid = user.getUID();
  }

  async loadData(){

    this.uid = this.user.getUID();

    //this.userPrefs2 = this.afs.collection('users').doc(this.uid).valueChanges().subscribe(val => console.log(val));
    this.afs.collection('users').doc(this.uid).valueChanges().subscribe(val => this.userPrefs = val);

    console.log(this.userPrefs);

  }

  async updatePreferences(string){
    
    this.afs.collection('users').doc(this.uid).set(this.userPrefs);
    
  }

  ngOnInit() {
    console.log("Profile Page")
    this.loadData()
  }
  

}
