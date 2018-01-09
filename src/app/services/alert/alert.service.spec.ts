import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AlertService } from './alert.service';

describe('AlertService', () => {
    let service: AlertService;

    beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
              AlertService
          ],
          imports: [
              RouterTestingModule
          ]
        });
    });

    beforeEach(inject([AlertService], s => { service = s; }));

    it('should create service', () => {
        expect(service).toBeDefined();
    });
});
