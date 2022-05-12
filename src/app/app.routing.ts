import { ModuleWithProviders } from "@angular/core";
import { Route, Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { OrdersComponent } from "./orders/orders.component";
import { ProductsComponent } from "./products/products.component";
import { ProductFormComponent } from "./product-form/product-form.component";

const appRoutes: Routes = [
    {path: "", component: HomeComponent},
    {path: "orders", component: OrdersComponent},
    {path: "products", component: ProductsComponent},
    {path: "productForm", component: ProductFormComponent},
    {path: "productForm/:id", component: ProductFormComponent},
    {path: "**", component: HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<Route> = RouterModule.forRoot(appRoutes);
