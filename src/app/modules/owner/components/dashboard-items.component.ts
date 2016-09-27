import { Component, OnInit, Input } from '@angular/core';


@Component({
    selector: 'dashboard-items',
    templateUrl: 'dashboard-items.component.html',
    
})
export class DashboardItemsComponent implements OnInit {
    
    @Input() data: any[];
    
    constructor() { }

    ngOnInit() { 
        
    }

    
} 
