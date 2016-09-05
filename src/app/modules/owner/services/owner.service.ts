import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CommonServiceImpl } from './common.service';
import { Owner } from '../models/owner';
import { Observable } from 'rxjs/Observable';
import { Deserializer } from './common.service';


@Injectable()
export class OwnerService {

    private url:string = "http://localhost:8080/RestTest/rest/owner/list";

    constructor(private commonService: CommonServiceImpl<Owner>,
                private http: Http) { }
    
    getList() : Observable<Owner[]>{
        let deserializer: Deserializer<Owner> = (jsonObject: any) => {
            let owner = new Owner(jsonObject.id, 
                jsonObject.name, 
                jsonObject.name);
            return Observable.of(owner)
        };
        
        return this.commonService.getList(this.url, deserializer);
    }
}
