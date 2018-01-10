import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AlertComponent } from './components/alert/alert.component';

import { ConfigService } from './services/config/config.service';
import { AlertService } from './services/alert/alert.service';
import { HelperService } from './services/helper/helper.service';
import { AuthenticationService } from './services/authentication/authentication.service';

import { TranslateModule, TranslateService, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', function () {
  let el: HTMLElement;
  let de: DebugElement;
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
      ConfigService.loadInstance('./base/site/test-config.json', './base/site/language/english.json').then(() => {
          TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                ToolbarComponent,
                AlertComponent
            ],
            providers: [
                {provide: 'configService', useFactory: () => ConfigService.getInstance()},
                {provide: 'translateService', useClass: TranslateService},
                {provide: 'alertService', useClass: AlertService},
                {provide: 'helperService', useClass: HelperService},
                {provide: 'authenticationService', useClass: AuthenticationService}
            ],
            imports: [
                RouterTestingModule,
                MaterialModule,
                HttpModule,
                JsonpModule,
                HttpClientModule,
                TranslateModule.forRoot({loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }}) 
            ]
          }).compileComponents();

          fixture = TestBed.createComponent(AppComponent);
          component = fixture.componentInstance;
      });
    }));

    it('should create component', () => {
        expect(component).toBeDefined();
        expect(component.appActive).toBeTruthy();
    });
});
