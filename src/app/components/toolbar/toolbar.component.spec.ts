import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ToolbarComponent } from './toolbar.component';
import { FormatCurrencyPipe } from './../../pipes/format-currency/format-currency.pipe';

import { ConfigService } from './../../services/config/config.service';
import { ProductService } from './../../services/product/product.service';
import { HelperService } from './../../services/helper/helper.service';
import { AuthenticationService } from './../../services/authentication/authentication.service';

import { MaterialModule } from './../../material.module';
import { HttpModule, JsonpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

describe('ToolbarComponent', () => {
    let component: ToolbarComponent;
    let fixture: ComponentFixture<ToolbarComponent>;

    beforeEach(async(() => {
        ConfigService.loadInstance('./base/site/test-config.json', './base/site/language/english.json').then(() => {
          TestBed.configureTestingModule({
            declarations: [
                ToolbarComponent,
                FormatCurrencyPipe
            ],
            providers: [
                {provide: 'configService', useFactory: () => ConfigService.getInstance()},
                {provide: 'productService', useClass: ProductService},
                {provide: 'helperService', useClass: HelperService},
                {provide: 'authenticationService', useClass: AuthenticationService}
            ],
            imports: [
                MaterialModule,
                RouterTestingModule,
                HttpModule,
                JsonpModule,
                HttpClientModule
            ]
          }).compileComponents();
      });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create component', () => {
        expect(component).toBeDefined();
    });
});
