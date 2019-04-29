import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore'
import { AlertController, BooleanValueAccessor}  from '@ionic/angular'
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  uid: any;
  logs: any;

  constructor(public afs: AngularFirestore, public user: UserService, public router: Router) { }

  ngOnInit() {

    
    this.uid = this.user.getUID();
    this.afs.collection('logs').doc(this.uid).valueChanges().subscribe((val:any) => this.logs = val.logs);
    //console.log("Prod Name", this.logs.productName);

  }

}
