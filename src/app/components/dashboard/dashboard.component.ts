import { Component, OnInit, Inject } from '@angular/core';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    private allProducts: Array<any> = [];

    constructor(@Inject('productService') private productService: any, @Inject('alertService') private alertService: any) {

    }

    ngOnInit() {
        this.productService.getAllProducts().subscribe((result) => {
            this.allProducts = result;
        });
    }

    addCart(id: number, name: string, qty: number = 1) {
        qty = qty || 1;

        if (this.productService.addCartProduct(id, name, qty)) {
            this.alertService.success('successfully add ' + name);
        }
    }

    get allProduct() {
        return this.allProducts;
    }
}
