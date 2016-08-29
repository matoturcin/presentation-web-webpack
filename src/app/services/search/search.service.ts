import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Product }           from '../../model/product';

@Injectable()
export class SearchService {
    
    private productUrl = 'http://localhost:8080/RestTest/test/product/search/';
    
    constructor(private http: Http) { }
    
        
    search(term: string) {
        return this.http.get(this.productUrl + term)
            .map((r: Response) => r.json() as Product[]);        
    }
}
