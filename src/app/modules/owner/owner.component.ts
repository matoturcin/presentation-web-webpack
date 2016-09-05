import { Component } from '@angular/core';
import { OwnerListComponent }    from './components/owner-list.component';

import { Product } from '../../model/product';

@Component({
    styles: ['.active{color: red}'],
    template: `
        <h2>Owner component</h2>
        <nav>
        <a routerLink="/owner" [routerLinkActiveOptions]="{ exact: true }" routerLinkActive="active">List owners</a>
        <a routerLink="/owner/product/1" routerLinkActive="active" >Owner</a>
        <a routerLink="/owner/admin" routerLinkActive="active">Owner Admin</a>
      </nav>
        <router-outlet></router-outlet>
    `
    
})
export class OwnerComponent {

    products: Product[];

}

