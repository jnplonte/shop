import { Component, OnInit, Inject, Input } from '@angular/core';

import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
    @Input() private sidenavRef: any;

    private cartLength: number = 0;

    userData: Object = {};

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

        let cartRawList: Array<any> = this.helperService.readStorage('cart-list') || [];
        this.cartLength = cartRawList.length;

        this.productService.cartList.subscribe(product => {
            this.cartLength = product.length;
        });
    }

    get isVisible() {
        return this.authenticationService.isLogin;
    }

    get userName(): string {
        return this.helperService.readStorage('auth-token').firstName || 'User';
    }
}
