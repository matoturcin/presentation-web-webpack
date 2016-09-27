import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';

import { OwnerListComponent }    from './components/owner-list.component';
import { OwnerDetailComponent }  from './components/owner-detail.component';
import { OwnerAdminComponent }  from './components/owner-admin.component';
import { OwnerComponent }  from './owner.component';
import { DashboardComponent }  from './components/dashboard.component';
import { DashboardCardComponent }  from './components/dashboard-card.component';
import { DashboardItemsComponent }  from './components/dashboard-items.component';
import { DynamicComponent } from './components/dynamic.component';

import { ownerRouting } from './owner.routing';
import { DialogService } from './services/dialog.service';
import { CanDeactivateGuard } from './services/can-deactivate-guard.service';
import { CommonModule }  from '@angular/common';
import { UpperCasePipe } from './pipes/upper-case.pipe';
import { ValuesPipe } from './pipes/values.pipe';
import { AnuHighlightDirective } from './directives/anu-highlight.directive';

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
        DashboardComponent,
        DashboardItemsComponent,
        DynamicComponent,
        DashboardCardComponent,
        OwnerAdminComponent,
        UpperCasePipe,
        ValuesPipe,
        AnuHighlightDirective
    ],
    providers: [
        DialogService,
        CanDeactivateGuard
    ]
})
export class OwnerModule { }
