import { async, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ProductService } from './product.service';
import { ConfigService } from './../config/config.service';
import { HelperService } from './../helper/helper.service';

import { HttpModule, JsonpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

describe('ProductService', () => {
    let service: ProductService;

    beforeEach(async(() => {
        ConfigService.loadInstance('./base/site/test-config.json', './base/site/language/english.json').then(() => {
            TestBed.configureTestingModule({
              providers: [
                  {provide: 'configService', useFactory: () => ConfigService.getInstance()},
                  {provide: 'helperService', useClass: HelperService},
                  ProductService
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

    beforeEach(inject([ProductService], s => { service = s; }));

    it('should create service', () => {
        expect(service).toBeDefined();
    });
});
