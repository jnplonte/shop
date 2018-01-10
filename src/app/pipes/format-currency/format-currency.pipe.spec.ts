import { TestBed, inject } from '@angular/core/testing';
import { FormatCurrencyPipe } from './format-currency.pipe';

import { HelperService } from './../../services/helper/helper.service';

describe('FormatCurrencyPipe', () => {
    let pipe: FormatCurrencyPipe;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
               HelperService
            ]
        });
    });

    beforeEach(inject([HelperService], s => {
        pipe = new FormatCurrencyPipe(s);
    }));

    it('should create pipe', () => {
        expect(pipe).toBeDefined();
    });

    it('should transform pipe', () => {
        expect(pipe.transform(1000, ',')).toEqual('1,000.00');
    });
});
