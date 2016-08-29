import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class AuthMockService {
    public isLoggedIn: boolean = false;

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    doLogin() {
        console.log("Mock auth, do login");
        return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
    }

    doLogout() {
        this.isLoggedIn = false;
    }
    
    isAuthenticated(){
        return this.isLoggedIn;
    }
    
    getUserName(){        
        return this.isLoggedIn ? 'User' : 'None';
    }
}
