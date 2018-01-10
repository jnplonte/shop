import { inject, TestBed } from '@angular/core/testing';

import { HelperService } from './helper.service';

describe('HelperService', function () {
    let service: HelperService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ HelperService ]
        });
    });

    beforeEach(inject([HelperService], s => { service = s; }));

    it('should create service', () => {
        expect(service).toBeDefined();
    });

    it('should check all services', () => {
        expect(service.formatCurrency).toBeDefined();
        expect(service.formatNumber).toBeDefined();
        expect(service.toJson).toBeDefined();
        expect(service.toString).toBeDefined();
        expect(service.createStorage).toBeDefined();
        expect(service.readStorage).toBeDefined();
        expect(service.eraseStorage).toBeDefined();
        expect(service.clearStorage).toBeDefined();
        expect(service.formatDate).toBeDefined();
        expect(service.cleanData).toBeDefined();
    });
});
