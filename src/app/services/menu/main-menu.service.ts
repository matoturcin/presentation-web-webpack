import { Injectable } from '@angular/core';
import { MenuItem } from '../../model/main-menu';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MainMenuService {

    private menuItemsUrl = 'http://localhost:8080/RestTest/rest/menu/items';

    constructor(private http: Http) { }

    getMenuItems() {
        return this.http.get(this.menuItemsUrl)
            .toPromise()
            .then(response => response.json() as MenuItem[])
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}
