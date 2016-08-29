import { Component } from '@angular/core';

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

}

