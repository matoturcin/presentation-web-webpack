import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../model/product';

@Component({
    selector: 'contact-page',
    templateUrl: 'contact.component.html',
    providers: [
        ProductService
    ]
})
export class ContactComponent implements OnInit {
    
    products: Product[];
    
    
    constructor(private productService: ProductService) { }
    
    ngOnInit() {
        this.getProducts();
    }
    
    getProducts() {
        this.productService.getProducts().then(products => this.products = products);
        
    }
    
}
