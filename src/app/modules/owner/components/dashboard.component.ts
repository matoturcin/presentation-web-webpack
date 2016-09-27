import { Component, OnInit, ViewChild, ViewContainerRef,
    ComponentFactoryResolver, ReflectiveInjector, ComponentFactory } from '@angular/core';
import { DynamicComponent } from './dynamic.component';

import { DashboardService } from '../services/dashboard-service';

import { MobilePhone } from '../models/mobile-phone';
import { Car } from '../models/car';
import { Owner } from '../models/owner';

@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html',
    entryComponents: [DynamicComponent],
    providers: [
        DashboardService
    ]
})
export class DashboardComponent implements OnInit {

    private cars: Car[];
    private owners: Owner[];
    private phones: MobilePhone[];
    @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;
    private componentFactory: ComponentFactory<DynamicComponent>;


    constructor(private dashboardService: DashboardService, private resolver: ComponentFactoryResolver) { }

    ngOnInit() {
        this.dashboardService.getCars().subscribe(data => this.cars = data);
        this.dashboardService.getPhones().subscribe(data => this.phones = data);
        this.dashboardService.getOwners().subscribe(data => this.owners = data);

        this.componentFactory = this.resolver.resolveComponentFactory(DynamicComponent);
        this.addComponent("Initial", 0);
    }

    private addComponent(text: string = "", index: number = 0): void {
        var componentReference = this.dynamicComponentContainer.createComponent(this.componentFactory, index);
        componentReference.instance.text = text;
        
    }

} 
