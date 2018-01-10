import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    private allProducts: Array<any> = [];

    constructor(private router: Router, @Inject('productService') private productService: any, @Inject('alertService') private alertService: any) {
    }

    ngOnInit() {
        this.router.events.filter(e => e.constructor.name === 'RoutesRecognized').pairwise().subscribe((evnt: any[]) => {
            if (evnt[0].urlAfterRedirects === '/log-in') {
                this.productService.getInitCartProduct();
            }
        });

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
