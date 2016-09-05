import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { OwnerListComponent }    from './components/owner-list.component';
import { OwnerDetailComponent }  from './components/owner-detail.component';
import { OwnerAdminComponent }  from './components/owner-admin.component';
import { OwnerComponent }  from './owner.component';
import { ownerRouting } from './owner.routing';
import { DialogService } from './services/dialog.service';
import { CanDeactivateGuard } from './services/can-deactivate-guard.service';
import { CommonModule }  from '@angular/common';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        ownerRouting
    ],
    declarations: [
        OwnerListComponent,
        OwnerDetailComponent,        
        OwnerComponent,        
        OwnerAdminComponent
    ],
    providers: [
        DialogService,
        CanDeactivateGuard
    ],
    bootstrap: [OwnerComponent]
})
export class OwnerModule { }
