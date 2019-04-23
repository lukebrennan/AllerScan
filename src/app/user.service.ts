import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';



interface user{
    email: string,
    uid: string,
}

@Injectable()
export class UserService{
    private user: user

    constructor(private afAuth: AngularFireAuth, private router: Router){

    }

    setUser(user: user){
        this.user = user
    }

    getUID(){
        if(!this.user){
            if(this.afAuth.auth.currentUser)
            {
                const user = this.afAuth.auth.currentUser;
                this.setUser({
                    email: user.email,
                    uid: user.uid
                })
                return user.uid
            } else {
                this.router.navigate(['/login'])
                throw new Error("User not logged in");
            }
    }
    else{
        return this.user.uid;
    }
    }
}