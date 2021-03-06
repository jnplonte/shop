import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { MATERIAL_SANITY_CHECKS } from '@angular/material';

import { MaterialModule } from './material.module';

import { RouterModule, Routes } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent }  from './app.component';

import { ConfigService } from './services/config/config.service';
import { HelperService } from './services/helper/helper.service';
import { AlertService } from './services/alert/alert.service';
import { AuthenticationService } from './services/authentication/authentication.service';
import { CheckoutService } from './services/checkout/checkout.service';

import { AuthGuard } from './guards/auth.guard';
import { UnAuthGuard } from './guards/un-auth.guard';

import { LogInComponent } from './components/log-in/log-in.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AlertComponent } from './components/alert/alert.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { GuideComponent } from './components/guide/guide.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProductService } from './services/product/product.service';


import { ProductFilterPipe } from './pipes/product-filter/product-filter.pipe';
import { FormatCurrencyPipe } from './pipes/format-currency/format-currency.pipe';
import { CartComponent } from './components/cart/cart.component';

export class jsonTranslateLoader implements TranslateLoader {
    private translation: Object = {};
    constructor() {
        this.translation = ConfigService.getInstance()['translation'] || {};
    }

    public getTranslation(lang: string = 'default'): Observable<any> {
        return Observable.create(observer => {
            observer.next(this.translation);
            observer.complete();
      });
    }
}

const appRoutes: Routes = [
    { path: '', component: DashboardComponent, canActivate: [AuthGuard], data: {title: 'Dashboard'}},
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: {title: 'Profile'}},
    { path: 'guide', component: GuideComponent, canActivate: [AuthGuard], data: {title: 'Guide'}},
    { path: 'cart', component: CartComponent, canActivate: [AuthGuard], data: {title: 'Cart'}},

    { path: 'log-in', component: LogInComponent, canActivate: [UnAuthGuard], data: {title: 'Log In'} },

    { path: '**', component: PageNotFoundComponent, data: {title: 'Page Not Found'} }
];

const appTranslate: Object = {
    loader: {
        provide: TranslateLoader,
        useClass: jsonTranslateLoader
    }
};

@NgModule({
  imports:      [ BrowserAnimationsModule,
                  BrowserModule,

                  MaterialModule,

                  HttpModule,
                  JsonpModule,
                  FormsModule,
                  ReactiveFormsModule,
                  HttpClientModule,
                  TranslateModule.forRoot(appTranslate),
                  RouterModule.forRoot(appRoutes, { useHash: true }) ],
  declarations: [ AppComponent,
                  LogInComponent, PageNotFoundComponent, DashboardComponent, AlertComponent, ToolbarComponent, GuideComponent, ProfileComponent, ProductFilterPipe, FormatCurrencyPipe, CartComponent ],
  providers:    [ AuthGuard, UnAuthGuard, Title,
                  {provide: MATERIAL_SANITY_CHECKS,  useValue: false},
                  {provide: 'configService', useFactory: () => ConfigService.getInstance()},
                  {provide: 'helperService', useClass: HelperService},
                  {provide: 'alertService', useClass: AlertService},
                  {provide: 'authenticationService', useClass: AuthenticationService},
                  {provide: 'checkoutService', useClass: CheckoutService},
                  {provide: 'translateService', useClass: TranslateService},
                  {provide: 'productService', useClass: ProductService},
                ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
