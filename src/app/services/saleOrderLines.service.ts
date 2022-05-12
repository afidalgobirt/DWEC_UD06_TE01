import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { SaleOrderLine } from "../models/SaleOrderLine";

@Injectable()
export class SaleOrderLineService {
    public http: HttpClient;
    public baseUrl: string;

    constructor(http: HttpClient) {
        this.http = http;
        this.baseUrl = "http://localhost/DWEC_UD06_TE01_API/api/SaleOrderLine.php";
    }

    public getAllSaleOrderLines(): Observable<any> {
        return this.http.get(this.baseUrl);
    }

    public getSaleOrderLineById(id: number): Observable<any> {
        return this.http.get(this.baseUrl + "?id=" + id);
    }

    public getSaleOrderLinesFromDateToDate(fromDate: Date, toDate: Date): Observable<any> {
        return this.http.get(
            this.baseUrl +
            "?fromDate=" + fromDate.toISOString() +
            "&toDate=" + toDate.toISOString()
        );
    }

    public postSaleOrderLine(saleOrderLine: SaleOrderLine): Observable<any> {
        return this.http.post(this.baseUrl, saleOrderLine);
    }

    public putSaleOrderLine(saleOrderLine: SaleOrderLine): Observable<any> {
        return this.http.put(this.baseUrl, saleOrderLine);
    }

    public deleteSaleOrderLine(id: number): Observable<any> {
        return this.http.delete(this.baseUrl + "?id=" + id);
    }
}
