import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit {
    cartData: Array<any> = [];

    loading: boolean = false;
    model: Object = {};

    constructor(private router: Router, @Inject('productService') private productService: any, @Inject('helperService') private helperService: any, @Inject('alertService') private alertService: any, @Inject('checkoutService') private checkoutService: any) {

    }

    ngOnInit() {
        this.productService.cartList.subscribe(product => {
            this.cartData = [];
            if (product.length >= 1) {
                product.forEach(data => {
                    this.productService.getProduct(data.id).subscribe((productData) => {
                        productData = productData[0];
                        productData.quantity = data.quantity;
                        productData.totalPrice = Number(productData.price) * Number(data.quantity);

                        this.cartData.push(productData);
                    });
                });
            }
        });

        this.productService.getInitCartProduct();
    }

    onCheckout() {
        this.loading = true;

        this.checkoutService.checkout(this.model, this.helperService.readStorage('cart-list'), this.cartTotalPrice).subscribe((result) => {
          if (result) {
              this.router.navigate(['/']).then(() => {
                  this.alertService.success('checkout success');
              });
          } else {
              this.alertService.error('error on checkout');
              this.loading = false;
          }
      });
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
