import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AlertComponent } from './components/alert/alert.component';

import { ConfigService } from './services/config/config.service';
import { TranslateModule, TranslateService, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';

import { MaterialModule } from './material.module';

describe('Component: AppComponent', function () {
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
                {provide: 'translateService', useClass: TranslateService}
            ],
            imports: [
                RouterTestingModule,
                MaterialModule,
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
