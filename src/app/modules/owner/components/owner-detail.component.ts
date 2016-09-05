import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { Observable }     from 'rxjs/Observable';
import { DialogService }  from '../services/dialog.service';

@Component({
    template: `<h1>Owner detail</h1>
        <button (click)=save()>Save</button>
        <button (click)=cancel()>Discard</button>        
    `
})
export class OwnerDetailComponent implements OnInit {

    private isChanged: boolean = false;

    constructor(
        private router: Router,
        public dialogService: DialogService
    ) { }

    ngOnInit() {

    }

    cancel() {
        this.isChanged = true;
        this.gotoAllOwners();
    }

    save() {
        console.log("save");
        this.isChanged = false;
        this.gotoAllOwners();
    }

    gotoAllOwners() {
        this.router.navigate(['/owner']);
    }

    canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
        // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
        if (!this.isChanged) {
            return true;
        }
        // Otherwise ask the user with the dialog service and return its
        // promise which resolves to true or false when the user decides
        return this.dialogService.confirm('Discard changes?');
    }
}

