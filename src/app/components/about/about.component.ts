import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'about-page',
    templateUrl: 'about.component.html'
})
export class AboutComponent implements OnInit {
    
    private webStorage: Storage;
    
    ngOnInit() {
        localStorage.setItem('name','Fero');
//        this.webStorage.setItem("name", "Fero");
        
        console.log(localStorage.getItem("name"));
        
        this.webStorage = window['localStorage'];
        
        console.log(this.webStorage.getItem("name"));
    }
}
