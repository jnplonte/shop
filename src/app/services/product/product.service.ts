import { Injectable, Inject } from '@angular/core';
import { Observable, Subject }  from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { productModel }  from './../../models/product.model';

@Injectable()
export class ProductService {
    private url: string = '';

    cartList: Subject<Array<any>> = new Subject<Array<any>>();

    constructor(private http: HttpClient, @Inject('configService') private configService: any, @Inject('helperService') private helperService: any) {
        this.url = this.configService.data.api.product;

        this.cartList.next(this.helperService.readStorage('cart-list') || []);
    }

    private handleError<T> (operation: string = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          return of(result as T);
        };
    }

    getAllProducts(): Observable<productModel[]> {
        return this.http.get<productModel[]>(this.url).pipe(
            map((result) => {
                if (typeof(result) !== 'undefined' && result['status'] === 'success' ) {
                    return result['data'];
                }
            }),
            catchError(this.handleError('getAllProducts', []))
        );
    }

    getProduct(id: number): Observable<productModel[]> {
        id = this.helperService.cleanData(id);

        return this.http.get<productModel[]>(this.url+ '/' + id).pipe(
            map((result) => {
                if (typeof(result) !== 'undefined' && result['status'] === 'success' ) {
                    return result['data'];
                }
            }),
            catchError(this.handleError('getProduct', []))
        );
    }

    addCartProduct(id: number, name: string, qty: number = 1) {
        let cartRawList: Array<any> = this.helperService.readStorage('cart-list') || [];
        if (cartRawList.find((elm) => { return elm.id === id })) {
            cartRawList.map((elm) => {
                if (elm.id === id) {
                    elm.quantity = Number(elm.quantity) + Number(qty);
                }
            });
        } else {
            cartRawList.push({
                'id': id,
                'name': name,
                'quantity': Number(qty)
            });
        }

        this.cartList.next(cartRawList);
        return this.helperService.createStorage('cart-list', cartRawList);
    }
}
