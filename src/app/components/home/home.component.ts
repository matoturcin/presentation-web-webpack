import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { TranslateService } from 'ng2-translate/ng2-translate';


import { Product } from '../../model/product';
import { ProductService } from '../../services/product/product.service';
import { SearchService } from '../../services/search/search.service';

@Component({
    selector: 'home-page',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css'],
    providers: [
        ProductService,
        SearchService
    ]
})
export class HomeComponent implements OnInit {

    active = true;
    products: Product[];
    @Input() product: Product;
    newProduct = new Product();
    edit = false;
    private sub: Subscription;
    private sub2: Subscription;
    private searchTerms = new Subject<string>();
    selectedId: number;
    showDialog: boolean = false;
    pageNumber = 1;

    constructor(
        private productService: ProductService,
        private searchService: SearchService,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.product = new Product();

        let productsInit = this.productService.getProductsPaging(this.pageNumber);
        let productsSearch = this.searchTerms
            .debounceTime(300)        // wait for 300ms pause in events
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(term => (term   // switch to new observable each time
                // return the http search observable
                ? this.searchService.search(term)
                // or the observable of empty heroes if no search term
                : this.productService.getProductsPaging(this.pageNumber)))
            .catch(error => {
                // TODO: real error handling
                console.log(error);
                return ([]);
            });
        this.sub = productsInit.concat(productsSearch).subscribe(products => this.updateProducts(products));

        this.sub2 = this.route
            .params
            .subscribe(params => {
                this.selectedId = +params['id'];
            });
    }

    search(term: string) {
        console.log(term);
        this.pageNumber = 1;
        this.searchTerms.next(term);
    }

    onEdit(product: Product) {
        this.newProduct = product;
        this.edit = true;
    }

    onDelete(product: Product) {
        this.productService.deleteProduct(product.id);
        setTimeout(() => this.getAllProducts(), 100);
    }

    resetForm() {
        this.newProduct = new Product();
        this.edit = false;
        this.active = false;
        setTimeout(() => this.active = true, 0);
    }

    showDialogForm() {
        this.resetForm();
        this.showDialog = true;
    }

    hideDialogForm() {
        this.showDialog = false;
    }

    onSubmit() {
        this.productService.addProduct(this.newProduct);
        this.newProduct = new Product();
        this.active = false;
        setTimeout(() => this.active = true, 0);
        setTimeout(() => { this.getAllProducts(); this.edit = false }, 100);
    }

    clearSearch() {
        this.getAllProducts();
    }

    getAllProducts() {
        console.log("get products");
        this.productService.getProductsPaging(this.pageNumber).subscribe(products => this.updateProducts(products));
    }

    getProductsPaging() {
        console.log("get products");
        this.productService.getProductsPaging(this.pageNumber).subscribe(products => this.appendProducts(products));
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
        this.sub2.unsubscribe();
    }

    onScroll(event: Event) {
        var windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        var body = document.body, html = document.documentElement;
        var docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        var windowBottom = windowHeight + window.pageYOffset;

        if (windowBottom >= docHeight) {
            this.pageNumber = this.pageNumber + 1;
            this.getProductsPaging();
        }
    }

    private updateProducts(products: Product[]) {
        this.products = products;
    }

    private appendProducts(products: Product[]) {
        this.products.push(...products);
    }

}
