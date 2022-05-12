import { Component, OnInit } from '@angular/core';

import { ClientService } from '../services/clients.service';
import { SaleOrderService } from '../services/saleOrders.service';
import { SaleOrderLineService } from '../services/saleOrderLines.service';

import { Client } from '../models/Client';
import { SaleOrder } from '../models/SaleOrder';
import { SaleOrderLine } from '../models/SaleOrderLine';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: [ClientService, SaleOrderService, SaleOrderLineService]
})
export class HomeComponent implements OnInit {
    private clientService: ClientService;
    private saleOrderService: SaleOrderService;
    private saleOrderLineService: SaleOrderLineService;

    public clients = new Map<number, Client>();
    public saleOrders = new Map<number, SaleOrder>();
    public saleOrderLines = new Map<number, SaleOrderLine>();

    public incomeKPI: number = 0;
    public clientsKPI: number = 0;
    public saleOrdersKPI: number = 0;

    constructor(clientService: ClientService, saleOrderService: SaleOrderService,
        saleOrderLineService: SaleOrderLineService) {
        this.clientService = clientService;
        this.saleOrderService = saleOrderService;
        this.saleOrderLineService = saleOrderLineService;
    }

    ngOnInit(): void {
        let date = new Date();
        let fromDate = new Date(date.getFullYear(), date.getMonth(), 1);
        let toDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        this.getClients(fromDate, toDate);
        this.getSaleOrders(fromDate, toDate);
        this.getSaleOrderLines(fromDate, toDate);
    }

    getClients(fromDate: Date, toDate: Date) {
        this.clientService.getClientsFromDateToDate(fromDate, toDate).subscribe({
            next: result => {
                this.clients.clear();

                (result as Array<any>).forEach((r) => {
                    this.clients.set(parseInt(r.id), new Client(
                        parseInt(r.id),
                        r.name,
                        r.lastName,
                        r.address,
                        r.email,
                        r.phone
                    ));
                });
                
                this.clientsKPI = this.clients.size;
            },
            error: error => {
                console.log(error);
            }
        });
    }

    getSaleOrders(fromDate: Date, toDate: Date) {
        this.saleOrderService.getSaleOrdersFromDateToDate(fromDate, toDate).subscribe({
            next: result => {
                this.saleOrders.clear();

                (result as Array<any>).forEach((r) => {
                    this.saleOrders.set(parseInt(r.id), new SaleOrder(
                        parseInt(r.id),
                        parseInt(r.clientId),
                        r.orderDateTime,
                        r.expectedDeliveryDate,
                        r.deliveryDate
                    ));
                });

                this.saleOrdersKPI = this.saleOrders.size;
            },
            error: error => {
                console.log(error);
            }
        });
    }

    getSaleOrderLines(fromDate: Date, toDate: Date) {
        this.saleOrderLineService.getSaleOrderLinesFromDateToDate(fromDate, toDate).subscribe({
            next: result => {
                this.saleOrderLines.clear();
                
                (result as Array<any>).forEach((r) => {
                    this.saleOrderLines.set(parseInt(r.id), new SaleOrderLine(
                        parseInt(r.id),
                        parseInt(r.saleOrderId),
                        parseInt(r.productId),
                        parseInt(r.quantity),
                        parseFloat(r.pricePerUnit)
                    ));
                });
                
                this.incomeKPI = 0;

                this.saleOrderLines.forEach((line) => {
                    this.incomeKPI += line.getPricePerUnit();
                });

                this.incomeKPI = parseFloat(this.incomeKPI.toFixed(2));
            },
            error: error => {
                console.log(error);
            }
        });
    }
}
