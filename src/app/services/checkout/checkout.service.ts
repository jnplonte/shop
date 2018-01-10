import { Injectable, Inject } from '@angular/core';
import { Observable }  from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions: Object = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CheckoutService {
    private url: string = '';

    constructor(private http: HttpClient, @Inject('productService') private productService: any, @Inject('configService') private configService: any, @Inject('helperService') private helperService: any) {
        this.url = this.configService.data.api.checkout;
    }

    private handleError<T> (operation: string = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          return of(result as T);
        };
    }

    checkout(userModel: Object, cartModel: any = [], totalPrice: number = 0): Observable<any[]> {
        let dataModel: Object = {
            'userData' : userModel,
            'cartData' : cartModel,
            'totalPrice' : totalPrice
        };

        return this.http.post<any[]>(this.url, this.helperService.cleanData(dataModel), httpOptions).pipe(
            map((result) => {
                if (typeof(result) !== 'undefined' && result['status'] === 'success' ) {
                    return true;
                }
            }),
            tap((result) => {
                this.helperService.eraseStorage('cart-list');
                this.productService.getInitCartProduct();
            }),
            catchError(this.handleError('checkout', null))
        );
    }
}
