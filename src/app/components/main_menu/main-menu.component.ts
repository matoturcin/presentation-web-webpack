import { Component, OnInit }  from '@angular/core';
import { MainMenuService } from '../../services/menu/main-menu.service';
import { MenuItem } from '../../model/main-menu';
//import { AuthService } from '../../services/auth/auth.service';
import { AuthMockService } from '../../services/auth/auth-mock.service';
import { Router }      from '@angular/router';

@Component({
    selector: 'main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

    constructor(private mainMenuService: MainMenuService,
        private authService: AuthMockService,
        private router: Router) { }

    menuItems: MenuItem[];

    ngOnInit() {
        this.getMainMenuItems();
    }

    getMainMenuItems() {
        this.mainMenuService.getMenuItems().then(menuItems => this.menuItems = menuItems);
    }

    get isAuthenticated() {
        return this.authService.isAuthenticated();
    }

    logout() {
        this.authService.doLogout();
        let redirect = '/login';
        this.router.navigate([redirect]);
    }

    changeLan(lang: any) {
        let urlTree = this.router.parseUrl(this.router.url);        
        urlTree.queryParams = { lan: lang.lang };
        this.router.navigateByUrl(urlTree);
    }

    get userName() {
        return this.authService.getUserName();
    }

}
