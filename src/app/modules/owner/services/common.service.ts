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
    
    getList(url: string, deserializer: Deserializer<T> = this.deserializer) : Observable<T[]>{        
        return this.http.get(url)
            .map((resp) => resp.json())
            .mergeMap((array: Array<any>) => Observable.from(array))
            .mergeMap((obj: any) =>  deserializer(obj))
            .toArray()
    }
    
    getListTest(url: string, deserializer: Deserializer<T> = this.deserializer) : Observable<T[]>{        
        return this.http.get(url)
            .map((resp) => resp.json() as T[])
//            .mergeMap((array: Array<T>) => Observable.from(array))
//            .mergeMap((obj: T) =>  deserializer(obj))
//            .toArray()
    }
}

export interface Deserializer<T> {
    (any: any): Observable<T>;
}


