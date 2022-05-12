import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Client } from "../models/Client";

@Injectable()
export class ClientService {
    public http: HttpClient;
    public baseUrl: string;

    constructor(http: HttpClient) {
        this.http = http;
        this.baseUrl = "http://localhost/DWEC_UD06_TE01_API/api/Client.php";
    }

    public getAllClients(): Observable<any> {
        return this.http.get(this.baseUrl);
    }

    public getClientById(id: number): Observable<any> {
        return this.http.get(this.baseUrl + "?id=" + id);
    }

    public getClientsFromDateToDate(fromDate: Date, toDate: Date): Observable<any> {
        return this.http.get(
            this.baseUrl +
            "?fromDate=" + fromDate.toISOString() +
            "&toDate=" + toDate.toISOString()
        );
    }

    public postClient(client: Client): Observable<any> {
        return this.http.post(this.baseUrl, client);
    }

    public putClient(client: Client): Observable<any> {
        return this.http.put(this.baseUrl, client);
    }

    public deleteClient(id: number): Observable<any> {
        return this.http.delete(this.baseUrl + "?id=" + id);
    }
}
