import { Component, OnInit, Input } from '@angular/core';



@Component({
    selector: 'dashboard-card',
    templateUrl: 'dashboard-card.component.html'
})
export class DashboardCardComponent implements OnInit {
    
    @Input() data: any[];
    
    constructor() { }

    ngOnInit() { 
        
    }  
} 
