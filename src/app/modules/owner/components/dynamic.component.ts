import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'dynamic-component',
    templateUrl: 'dynamic.component.html'
})
export class DynamicComponent implements OnInit {
    
    @Input() text : string;
    
    constructor() { }

    ngOnInit() { }

} 
