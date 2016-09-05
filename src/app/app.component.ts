import { Component  } from '@angular/core';
import { MainMenuService } from './services/menu/main-menu.service';
import { WindowService } from "./services/auth/window.service";
import { TranslateService } from 'ng2-translate/ng2-translate';
import './rxjs-extensions';
import '../styles.css';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [
        MainMenuService,
        WindowService
    ]
})
export class AppComponent {
    
    constructor(
            translate: TranslateService) 
        {        
        translate.setDefaultLang('en');
        translate.use('en');
    }
    
    title = 'Presentation web';
}
