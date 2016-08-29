import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { OwnerListComponent }    from './components/owner-list.component';
import { OwnerDetailComponent }  from './components/owner-detail.component';
import { OwnerAdminComponent }  from './components/owner-admin.component';
import { OwnerComponent }  from './owner.component';
import { ownerRouting } from './owner.routing';
import { DialogService } from './services/dialog.service';
import { CanDeactivateGuard } from './services/can-deactivate-guard.service';

@NgModule({
    imports: [
        FormsModule,
        ownerRouting
    ],
    declarations: [
        OwnerDetailComponent,
        OwnerListComponent,
        OwnerComponent,
        OwnerAdminComponent
    ],
    providers: [
        DialogService,
        CanDeactivateGuard
    ],
})
export class OwnerModule { }
