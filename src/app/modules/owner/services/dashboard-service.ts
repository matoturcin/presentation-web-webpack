import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MobilePhone } from '../models/mobile-phone';
import { Car } from '../models/car';
import { Owner } from '../models/owner';

@Injectable()
export class DashboardService {

    private cars: Car[];
    private phones: MobilePhone[];
    private owners: Owner[];

    constructor() {
        this.cars = [
            new Car(1, "Honda", "Blue"), 
            new Car(2, "VW", "Black"),
            new Car(2, "Toyota", "Brown")];
                    
        this.phones = [
            new MobilePhone(1, "Lenovo"), 
            new MobilePhone(2, "Samsung"),
            new MobilePhone(2, "HTC")];
            
        this.owners = [
            new Owner(1, "Fero"), 
            new Owner(2, "Duro"),
            new Owner(2, "Jozo")];
    }
    
    public getCars() : Observable<Car[]>{
        return Observable.of(this.cars);
    }
    
    public getPhones() : Observable<MobilePhone[]>{
        return Observable.of(this.phones);
    }
    
    public getOwners() : Observable<Owner[]>{
        return Observable.of(this.owners);
    }
}