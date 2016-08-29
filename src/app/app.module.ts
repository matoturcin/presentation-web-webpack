import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { routing, appRoutingProviders } from './app.routes';
import { AppComponent }  from './app.component';
import { HttpModule } from '@angular/http';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { Http } from '@angular/http';

import { MainMenuComponent } from './components/main_menu/main-menu.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductRegistrationFormComponent } from './components/product-registration/product-registration-form.component';
import { ProductComponent } from './components/home/product.component';
import { PageNotFoundComponent } from './components/general/page-not-found.component';

import { OwnerModule } from './modules/owner/owner.module';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        HttpModule,
        OwnerModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
            deps: [Http]
        })
    ],
    declarations: [
        ProductComponent,
        PageNotFoundComponent,
        MainMenuComponent,
        AboutComponent,
        ContactComponent,
        HomeComponent,
        LoginComponent,
        ProductRegistrationFormComponent,
        AppComponent
    ],
    providers: [appRoutingProviders],
    bootstrap: [AppComponent]
})
export class AppModule { }
