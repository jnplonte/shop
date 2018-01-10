import { Component, OnInit, Inject, Input } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import * as _ from 'lodash';

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
    @Input() private sidenavRef: any;

    cartData: Array<any> = [];

    companyName: string = '';

    clock: Observable<any>;

    constructor(@Inject('configService') private configService: any, @Inject('productService') private productService: any, @Inject('authenticationService') private authenticationService: any, @Inject('helperService') private helperService: any) {
        this.companyName = this.configService.data.companyName;
        this.clock = Observable.interval(100).map(() => new Date());
    }

    ngOnInit() {
        if (this.sidenavRef) {
            this.sidenavRef.close();
        }

        this.productService.cartList.subscribe(product => {
            this.cartData = [];
            if (product.length >= 1) {
                product.forEach(data => {
                    this.productService.getProduct(data.id).subscribe((productData) => {
                        productData = productData[0];
                        productData.quantity = data.quantity;
                        productData.totalPrice = Number(productData.price) * Number(data.quantity);

                        if (_.findIndex(this.cartData, productData) === -1) {
                            this.cartData.push(productData);
                        }
                    });
                });
            }
        });

        this.productService.getInitCartProduct();
    }

    get isVisible() {
        return this.authenticationService.isLogin;
    }

    get userName(): string {
        return this.helperService.readStorage('auth-token').firstName || 'User';
    }

    get cartLength(): number {
        return this.cartData.length;
    }

    get cartTotalPrice(): number {
        return this.cartData.map(item => item.totalPrice).reduce((prev, next) => {
            return Number(prev) + Number(next);
        });
    }
}
