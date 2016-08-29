import { Component }   from '@angular/core';
import { Router }      from '@angular/router';
//import { AuthService } from '../../services/auth/auth.service';
import { AuthMockService } from '../../services/auth/auth-mock.service';

@Component({
    template: `
    <h2>LOGIN</h2>
    <p>{{message}}</p>
    <p>
      <button (click)="login()"  *ngIf="!authService.isLoggedIn">Login</button>
      <button (click)="logout()" *ngIf="authService.isLoggedIn">Logout</button>
    </p>`
})
export class LoginComponent {
    message: string;
    constructor(public authService: AuthMockService, public router: Router) {
        this.setMessage();
    }
    setMessage() {
        this.message = 'Logged ' + (this.authService.isAuthenticated() ? 'in' : 'out');
    }
    login() {

        this.message = 'Trying to log in ...';
        this.authService.doLogin().subscribe(() => {
            this.setMessage();
            if (this.authService.isLoggedIn) {
                // Get the redirect URL from our auth service
                // If no redirect has been set, use the default
                let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/home';
                // Redirect the user
                this.router.navigate([redirect]);
            }
        });


        //        console.log("login has been clicked");
        //        this.message = 'Trying to log in ...';
        //        this.authService.doLogin();
        //        this.setMessage();
        //        if (this.authService.isAuthenticated()) {
        //            // Get the redirect URL from our auth service
        //            // If no redirect has been set, use the default
        ////            let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/home';
        //            let redirect = '/home';
        //            // Redirect the user
        //            this.router.navigate([redirect]);
        //        };
    }
    logout() {
        this.authService.doLogout();
        this.setMessage();
    }

    get isLoggedIn() {
        return this.authService.isAuthenticated();
    }
}
