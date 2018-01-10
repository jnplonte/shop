import { async, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CheckoutService } from './checkout.service';
import { ConfigService } from './../config/config.service';
import { HelperService } from './../helper/helper.service';
import { ProductService } from './../product/product.service';

import { HttpModule, JsonpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

describe('CheckoutService', () => {
    let service: CheckoutService;

    beforeEach(async(() => {
        ConfigService.loadInstance('./base/site/test-config.json', './base/site/language/english.json').then(() => {
            TestBed.configureTestingModule({
              providers: [
                  {provide: 'configService', useFactory: () => ConfigService.getInstance()},
                  {provide: 'helperService', useClass: HelperService},
                  {provide: 'productService', useClass: ProductService},
                  CheckoutService
              ],
              imports: [
                  RouterTestingModule,
                  HttpModule,
                  JsonpModule,
                  HttpClientModule
              ]
            });
        });
      }));

    beforeEach(inject([CheckoutService], s => { service = s; }));

    it('should create service', () => {
        expect(service).toBeDefined();
    });
});
