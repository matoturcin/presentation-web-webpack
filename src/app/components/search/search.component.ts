import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import { SearchService } from '../../services/search/search.service';
import { Product } from '../../model/product';

@Component({
    selector: 'product-search',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.css'],
    providers: [SearchService]
})
export class SearchComponent implements OnInit {

    @Input() product: Product;
    @Output() parentAction = new EventEmitter();
    products: Observable<Product[]>;
    showResults: boolean = true;
    private searchTerms = new Subject<string>();

    constructor(private searchService: SearchService) { }

    // Push a search term into the observable stream.
    search(term: string) {
        console.log(term);
        this.showResults = true;
        this.searchTerms.next(term);
    }

    ngOnInit() {
        this.product = new Product();
        this.products = this.searchTerms
            .debounceTime(300)        // wait for 300ms pause in events
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(term => term   // switch to new observable each time
                // return the http search observable
                ? this.searchService.search(term)
                // or the observable of empty heroes if no search term
                : Observable.of<Product[]>([]))
            .catch(error => {
                // TODO: real error handling
                console.log(error);
                return Observable.of<Product[]>([]);
            });
    }

    clearSearch() {
        this.product.name = '';
    }

    eventHandler(event: any) {
        if (event.keyCode === 13){
            
        }
    }

    searchProducts(product: Product) {
        this.showResults = false;
        this.product = product;
        this.parentAction.emit(product);
    }

}
