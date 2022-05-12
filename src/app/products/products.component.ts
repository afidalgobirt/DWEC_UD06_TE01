import { Component, OnInit } from '@angular/core';

import { ProductService } from '../services/products.service';
import { Product } from '../models/Product';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
    providers: [ProductService]
})
export class ProductsComponent implements OnInit {
    private productService: ProductService;
    public products = new Map<number, Product>();

    constructor(productsService: ProductService) {
        this.productService = productsService;
    }

    ngOnInit(): void {
        this.getProducts();
    }

    getProducts() {
        this.productService.getAllProducts().subscribe({
            next: result => {
                this.products.clear();

                (result as Array<any>).forEach((r) => {
                    this.products.set(parseInt(r.id), new Product(
                        parseInt(r.id),
                        r.name,
                        parseInt(r.stock),
                        r.unitOfMeasure,
                        parseFloat(r.pricePerUnit)
                    ));
                });
            },
            error: error => {
                console.log(error);
            }
        });
    }

    deleteProduct(id: number, name: string) {
        if (window.confirm("Se eliminará el producto " + name + ".\n¿Desea continuar?")) {
            this.productService.deleteProduct(id).subscribe({
                next: result => { window.location.reload(); },
                error: error => { console.log(error); }
            });
        }
    }
}
