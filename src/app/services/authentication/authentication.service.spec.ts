import { async, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthenticationService } from './authentication.service';
import { ConfigService } from './../config/config.service';
import { HelperService } from './../helper/helper.service';

import { HttpModule, JsonpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

describe('AuthenticationService', () => {
    let service: AuthenticationService;

    beforeEach(async(() => {
        ConfigService.loadInstance('./base/site/test-config.json', './base/site/language/english.json').then(() => {
            TestBed.configureTestingModule({
              providers: [
                  {provide: 'configService', useFactory: () => ConfigService.getInstance()},
                  {provide: 'helperService', useClass: HelperService},
                  AuthenticationService
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

    beforeEach(inject([AuthenticationService], s => { service = s; }));

    it('should create service', () => {
        expect(service).toBeDefined();
    });
});
