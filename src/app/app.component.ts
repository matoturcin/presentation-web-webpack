import { Component  } from '@angular/core';
import { MainMenuService } from './services/menu/main-menu.service';
import { WindowService } from "./services/auth/window.service";
import { TranslateService } from 'ng2-translate/ng2-translate';
import { ActivatedRoute } from '@angular/router';

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
    
    private language: string = "en"
    
    constructor(
            private translate: TranslateService,
            private route: ActivatedRoute) 
        {        
        translate.setDefaultLang('en');
        translate.use('en');
        
        
        
        this.route
            .queryParams
            .subscribe(params => {
                this.language = params['lan'] ? params['lan'] : this.language;
                console.log(this.language);
                this.translate.use(this.language);
            });
    }
    
    title = 'Presentation web';
}
