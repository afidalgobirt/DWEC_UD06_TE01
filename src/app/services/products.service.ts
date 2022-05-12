import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Product } from "../models/Product";

@Injectable()
export class ProductService {
    public baseUrl: string;
    public http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
        this.baseUrl = "http://localhost/DWEC_UD06_TE01_API/api/Product.php";
    }

    public getAllProducts(): Observable<any> {
        return this.http.get(this.baseUrl);
    }

    public getProductById(id: number): Observable<any> {
        return this.http.get(this.baseUrl + "?id=" + id);
    }

    public postProduct(product: Product): Observable<any> {
        return this.http.post(this.baseUrl, product);
    }

    public putProduct(product: Product): Observable<any> {
        return this.http.put(this.baseUrl, product);
    }

    public deleteProduct(id: number): Observable<any> {
        return this.http.delete(this.baseUrl + "?id=" + id);
    }
}
