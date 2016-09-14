import { Component, OnInit }  from '@angular/core';
import { MainMenuService } from '../../services/menu/main-menu.service';
import { MenuItem } from '../../model/main-menu';
//import { AuthService } from '../../services/auth/auth.service';
import { AuthMockService } from '../../services/auth/auth-mock.service';
import { Router }      from '@angular/router';
import { TranslateService } from 'ng2-translate/ng2-translate';

@Component({
    selector: 'main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

    constructor(private mainMenuService: MainMenuService,
        private authService: AuthMockService,
        private router: Router,
        private translate: TranslateService) { }

    menuItems: MenuItem[];
    language: string = 'en';
    languages: string[];

    ngOnInit() {
        this.languages = ['en', 'sk'];
        this.getMainMenuItems();
    }

    getMainMenuItems() {
        this.mainMenuService.getMenuItems().subscribe(menuItems => this.menuItems = menuItems);
    }

    get isAuthenticated() {
        return this.authService.isAuthenticated();
    }

    logout() {
        this.authService.doLogout();
        let redirect = '/login';
        this.router.navigate([redirect]);
    }

    changeLan(langulage: string) {
        this.language = langulage;
        this.translate.use(this.language);
    }

    get userName() {
        return this.authService.getUserName();
    }

}
