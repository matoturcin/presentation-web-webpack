import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../services/owner.service.ts';
import { CommonServiceImpl } from '../services/common.service.ts';
import { Owner } from '../models/owner';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'owner-list',
    templateUrl: './owner-list.component.html',
    providers: [
        OwnerService,
        CommonServiceImpl       
    ]
})
export class OwnerListComponent implements OnInit{

    private owners: Owner[];

    constructor(private ownerService: OwnerService) {

    }
    
    ngOnInit(){
        this.ownerService.getList().subscribe(owners => {this.owners = owners; console.log(this.owners)});
    }


}


