import { Pipe, PipeTransform, Inject } from '@angular/core';

@Pipe({
    name: 'formatCurrency'
})

export class FormatCurrencyPipe implements PipeTransform {
    constructor(@Inject('helperService') private helperService: any) {

    }

    transform(currency?: number, currencyPattern: string = ','): string {
        return this.helperService.formatCurrency(currency.toString(), currencyPattern) || '';
    }
}
