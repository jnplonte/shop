import { async, inject, TestBed } from '@angular/core/testing';

import { ConfigService } from './config.service';

describe('ConfigService', function () {
    let service: ConfigService;

    beforeEach(async(() => {
        ConfigService.loadInstance('./base/site/test-config.json', './base/site/language/english.json').then(() => {
            TestBed.configureTestingModule({
                providers: [ {provide: 'configService', useFactory: () => ConfigService.getInstance()} ]
            });
        });
    }));

    it('should create service', () => {
        expect(ConfigService).toBeDefined();
    });

    it('should fetch the site config', () => {
        expect(JSON.stringify(ConfigService.getInstance())).toContain('data');
    });
});
