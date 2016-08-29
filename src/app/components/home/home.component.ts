import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from 'ng2-translate/ng2-translate';


import { Product } from '../../model/product';
import { ProductService } from '../../services/product/product.service';
import { SearchService } from '../../services/search/search.service';
import { SearchComponent } from '../search/search.component';

@Component({
    selector: 'home-page',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css'],
    providers: [
        ProductService,
        SearchService
    ],
    directives: [SearchComponent]
})
export class HomeComponent implements OnInit {

    active = true;
    products: Observable<Product[]>;
    @Input() product: Product;
    newProduct = new Product();
    edit = false;
    private sub: Subscription;
    private sub2: Subscription;
    private searchTerms = new Subject<string>();
    selectedId: number;
    language: string = "en";

    constructor(
            private productService: ProductService,
            private searchService: SearchService,
            private router: Router,
            private route: ActivatedRoute,
            private translate: TranslateService) {}

    ngOnInit() {
        this.product = new Product();

        let productsInit = this.productService.getProductsObs();
        let productsSearch = this.searchTerms
            .debounceTime(300)        // wait for 300ms pause in events
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(term => (term   // switch to new observable each time
                // return the http search observable
                ? this.searchService.search(term)
                // or the observable of empty heroes if no search term
                : this.productService.getProductsObs()))
            .catch(error => {
                // TODO: real error handling
                console.log(error);
                return Observable.of<Product[]>([]);
            });
        this.sub = productsInit.concat(productsSearch).subscribe(res => this.products = Observable.of<Product[]>(res));

        this.sub2 = this.route
            .params
            .subscribe(params => {
                this.selectedId = +params['id'];
            });
            
        this.sub2 = this.route
            .queryParams
            .subscribe(params => {
                this.language = params['lan'] ? params['lan'] : this.language;
                console.log(this.language);
                this.translate.use(this.language);
            }); 
            
                  
        
    }

    onSelect(product: Product) {
        this.router.navigate(['/home', product.id]);
    }

    search(term: string) {
        console.log(term);
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
        this.productService.getProductsObs().subscribe(products => this.products = Observable.of<Product[]>(products));
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
        this.sub2.unsubscribe();
    }
}
