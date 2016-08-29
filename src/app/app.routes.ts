import { Routes, RouterModule }  from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { ProductRegistrationFormComponent } from './components/product-registration/product-registration-form.component';
import { ProductComponent } from './components/home/product.component';
import { PageNotFoundComponent } from './components/general/page-not-found.component';

import { AuthGuard }      from './services/auth/auth-guard.service';
//import { AuthService }    from './services/auth/auth.service';
import { AuthMockService }    from './services/auth/auth-mock.service';
import { WindowService } from "./services/auth/window.service";

const appRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'home/:id',
        component: ProductComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'contact',
        component: ContactComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'product-registration',
        component: ProductRegistrationFormComponent
    },
    { 
        path: 'login', 
        component: LoginComponent 
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

export const appRoutingProviders: any[] = [
    AuthGuard,
//    AuthService,
    AuthMockService,
    WindowService
];
export const routing = RouterModule.forRoot(appRoutes);
