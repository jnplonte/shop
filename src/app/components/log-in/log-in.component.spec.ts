import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LogInComponent } from './log-in.component';

import { ConfigService } from './../../services/config/config.service';
import { AlertService } from './../../services/alert/alert.service';
import { HelperService } from './../../services/helper/helper.service';
import { AuthenticationService } from './../../services/authentication/authentication.service';

import { MaterialModule } from './../../material.module';
import { HttpModule, JsonpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LogInComponent', () => {
    let component: LogInComponent;
    let fixture: ComponentFixture<LogInComponent>;

    beforeEach(async(() => {
        ConfigService.loadInstance('./base/site/test-config.json', './base/site/language/english.json').then(() => {
            TestBed.configureTestingModule({
                declarations: [
                    LogInComponent
                ],
                providers: [
                    {provide: 'configService', useFactory: () => ConfigService.getInstance()},
                    {provide: 'alertService', useClass: AlertService},
                    {provide: 'helperService', useClass: HelperService},
                    {provide: 'authenticationService', useClass: AuthenticationService}
                ],
                imports: [
                    MaterialModule,
                    RouterTestingModule,
                    HttpModule,
                    JsonpModule,
                    HttpClientModule,
                    FormsModule,
                    ReactiveFormsModule,
                    BrowserModule,
                    BrowserAnimationsModule
                ]
            }).compileComponents();
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LogInComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create component', () => {
        expect(component).toBeDefined();
    });
});
