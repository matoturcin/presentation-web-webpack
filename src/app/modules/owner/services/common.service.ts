import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Owner } from '../models/owner';

export interface CommonService<T>{    
    getList(url: string): Observable<T[]>;    
}

@Injectable()
export class CommonServiceImpl<T> implements CommonService<T>{
    
    deserializer: Deserializer<T> = (any) => Observable.of(any);
    
    constructor(private http: Http) { }
    
    getList(url: string, deserializer: Deserializer<T> = this.deserializer){        
        return this.http.get(url)
            .map((resp) => {console.log('resp ' + resp); console.log('resp.json() ' + resp.json()); return resp.json(); })
            .mergeMap((array: Array<any>) => {console.log('array ' + array); console.log('Observable.from(array) ' + Observable.from(array)); return Observable.from(array)})
            .mergeMap((obj: any) =>  {console.log('obj ' + obj); console.log('deserializer(obj) ' + deserializer(obj)); return deserializer(obj)})
            .toArray()
    }
}

export interface Deserializer<T> {
    (any: any): Observable<T>;
}


