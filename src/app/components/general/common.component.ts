import { OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from 'ng2-translate/ng2-translate';


export class CommonComponent implements OnInit {

    protected language: string;
    protected languageSub: Subscription;
    protected route : ActivatedRoute;
    protected translate : TranslateService;
    
    constructor(route: ActivatedRoute,
        translate: TranslateService){
        
        this.language = "en";
        this.route = route;
    }

    ngOnInit() : void {
        console.log("Initialize component");
        this.languageSub = this.route
            .queryParams
            .subscribe(params => {
                this.language = params['lan'] ? params['lan'] : this.language;
                console.log(this.language);
                this.translate.use(this.language);
            });
    }
    
    ngOnDestro() : void{
        console.log("Component cleanup");
    }
}
