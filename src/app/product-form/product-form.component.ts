import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductService } from '../services/products.service';

import { Product } from '../models/Product';

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.scss'],
    providers: [ProductService]
})
export class ProductFormComponent implements OnInit {
    private route: ActivatedRoute;
    private router: Router;

    private productService: ProductService;

    public product: Product;

    constructor(route: ActivatedRoute, router: Router, productService: ProductService) {
        this.route = route;
        this.router = router;
        this.productService = productService;
        this.product = new Product(0, "", 0, "", 0);
    }

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            if (params.hasOwnProperty('id')) {
                this.productService.getProductById(params['id']).subscribe({
                    next: (result: any) => {
                        this.product = new Product(
                            result.id,
                            result.name,
                            result.stock,
                            result.unitOfMeasure,
                            result.pricePerUnit
                        );
                    },
                    error: error => {
                        console.log(error);
                    }
                });
            }
        });
    }

    onSubmit() {
        if (this.product.id == 0) {
            this.productService.postProduct(this.product).subscribe({
                next: result => { this.router.navigate(['/products']); },
                error: error => { console.log(error); }
            });
        } else {
            this.productService.putProduct(this.product).subscribe({
                next: result => { this.router.navigate(['/products']); },
                error: error => { console.log(error); }
            });
        }
    }
}
