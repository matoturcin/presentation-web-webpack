import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CommonServiceImpl } from './common.service';
import { Car } from '../models/car';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CarService {

    private url: string = "http://localhost:8080/RestTest/rest/car/list";

    constructor(private commonService: CommonServiceImpl<Car>,
        private http: Http) { }
        
    getList(ownerName: string): Observable<Car[]> {        
        return this.commonService.getList(this.url + "/" + ownerName);
    }
}
