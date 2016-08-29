import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/subscription';

import { Product } from '../../model/product';
import { ProductService } from '../../services/product/product.service';

@Component({
    selector: '<product>',
    templateUrl: './product.component.html',
    providers: [
        ProductService
    ]
})
export class ProductComponent implements OnInit {

    private sub: Subscription;
    private product = new Product();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private productService: ProductService
    ) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let id = +params['id']; // (+) converts string 'id' to a number
            console.log(id);
            this.productService.getProductProm(id).then(product => this.product = product);
            console.log(this.product);
        });
    }

    gotoHome() {
        let productId = this.product ? this.product.id : null;
        this.router.navigate(['/home', { id: productId, foo: 'foo' }]);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
