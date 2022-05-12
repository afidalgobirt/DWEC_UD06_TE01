import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { SaleOrder } from "../models/SaleOrder";

@Injectable()
export class SaleOrderService {
    public http: HttpClient;
    public baseUrl: string;

    constructor(http: HttpClient) {
        this.http = http;
        this.baseUrl = "http://localhost/DWEC_UD06_TE01_API/api/SaleOrder.php";
    }

    public getAllSaleOrders(): Observable<any> {
        return this.http.get(this.baseUrl);
    }

    public getSaleOrderById(id: number): Observable<any> {
        return this.http.get(this.baseUrl + "?id=" + id);
    }

    public getSaleOrdersFromDateToDate(fromDate: Date, toDate: Date): Observable<any> {
        return this.http.get(
            this.baseUrl +
            "?fromDate=" + fromDate.toISOString() +
            "&toDate=" + toDate.toISOString()
        );
    }

    public postSaleOrder(saleOrder: SaleOrder): Observable<any> {
        return this.http.post(this.baseUrl, saleOrder);
    }

    public putSaleOrder(saleOrder: SaleOrder): Observable<any> {
        return this.http.put(this.baseUrl, saleOrder);
    }

    public deleteSaleOrder(id: number): Observable<any> {
        return this.http.delete(this.baseUrl + "?id=" + id);
    }
}
