import { Routes, RouterModule } from '@angular/router';

import { OwnerListComponent } from './components/owner-list.component';
import { OwnerDetailComponent } from './components/owner-detail.component';
import { OwnerAdminComponent }  from './components/owner-admin.component';
import { DashboardComponent }  from './components/dashboard.component';
import { OwnerComponent } from './owner.component';


import { AuthGuard } from '../../services/auth/auth-guard.service';
import { CanDeactivateGuard } from './services/can-deactivate-guard.service';

const ownersRoutes: Routes = [
    {
        path: 'owner',
        component: OwnerComponent,
        children: [
            { 
                path: 'product/:id', 
                component: OwnerDetailComponent,
                canDeactivate: [CanDeactivateGuard]
            },
            { 
                path: '', 
                component: OwnerListComponent 
            },
            { 
                path: 'admin', 
                component: OwnerAdminComponent,
                canActivate: [AuthGuard]
            }
            ,
            { 
                path: 'dashboard', 
                component: DashboardComponent
            }
        ]
    }
];

export const ownerRouting = RouterModule.forChild(ownersRoutes);