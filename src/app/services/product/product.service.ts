import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

import { Product } from '../../model/product';


@Injectable()
export class ProductService {

    private productUrl = 'http://localhost:8080/RestTest/rest/product';

    constructor(private http: Http) { }

    getProducts(): Promise<Product[]> {
        let url = this.productUrl + '/list';
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Product[])
            .catch(this.handleError);
    }
    
    getProduct(productId: number): Observable<Product> {
        let url = this.productUrl + "/" + productId; ;        
        return this.http.get(url)
            .map(response => response.json() as Product);
    }
    
    getProductProm(productId: number): Promise<Product> {
        let url = this.productUrl + "/" + productId;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Product);
    }
    
    getProductsObs(): Observable<Product[]> {
        let url = this.productUrl + '/list';
        return this.http.get(url)
            .map(response => response.json() as Product[]);
//            .map((array) => array.sort((a, b) => a.oid - b.oid));
    }

    addProduct(product: Product) {

        let body = JSON.stringify( product );
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        console.info(product.name);

        let result = this.http.post(this.productUrl, body, options).toPromise();
            
        return result;
    }
    
    deleteProduct(productId: number){
        let url = this.productUrl + "/" + productId;        
        console.info(productId);
        let result = this.http.delete(url).toPromise();            
        return result;
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}

