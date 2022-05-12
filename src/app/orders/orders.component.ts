import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { ClientService } from '../services/clients.service';
import { SaleOrderService } from '../services/saleOrders.service';

import { Client } from '../models/Client';
import { SaleOrder } from '../models/SaleOrder';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss'],
    providers: [ClientService, SaleOrderService, DatePipe]
})
export class OrdersComponent implements OnInit {
    private datePipe: DatePipe;

    private clientService: ClientService;
    private saleOrderService: SaleOrderService;
    
    public saleOrders = new Map<number, SaleOrder>();
    public clients = new Map<number, Client>();

    constructor(clientService: ClientService, saleOrderService: SaleOrderService, datePipe: DatePipe) {
        this.clientService = clientService;
        this.saleOrderService = saleOrderService;
        this.datePipe = datePipe;
    }

    ngOnInit(): void {
        this.getClients();
        this.getSaleOrders();
    }

    getClients() {
        this.clientService.getAllClients().subscribe({
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
            },
            error: error => {
                console.log(error);
            }
        });
    }

    getSaleOrders() {
        this.saleOrderService.getAllSaleOrders().subscribe({
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
            },
            error: error => {
                console.log(error);
            }
        });
    }

    handleExpectedDeliveryDateChange(e: any, expectedDeliveryDate: Date) {
        let targetInput: HTMLInputElement;
        let table: HTMLTableElement;
        let editButton: HTMLButtonElement;
        let newDate: string;

        targetInput = e.target;
        newDate = targetInput.value;
        table = targetInput.parentElement?.parentElement as HTMLTableElement;
        editButton = table.lastChild?.firstChild as HTMLButtonElement;

        // ? No entiendo por que pero si no hago un new Date con la variable expectedDeliveryDate
        // ? que supuestamente ya es de tipo Date da error diciendo que el método toISOString no existe.
        if (new Date(expectedDeliveryDate).toISOString() == new Date(newDate).toISOString()) {
            editButton.classList.add("disabled-button");
        } else {
            editButton.classList.remove("disabled-button");
        }
    }

    handleEditSaleOrderClicked(e: any, saleOrder: SaleOrder) {
        let targetButton = e.target as HTMLButtonElement;
        let newDate: any;

        if (targetButton.classList.contains("disabled-button")) {
            return;
        }

        newDate = (targetButton.parentElement?.parentElement?.childNodes[3].firstChild as HTMLInputElement).value;
        saleOrder.setExpectedDeliveryDate(newDate);

        this.saleOrderService.putSaleOrder(saleOrder).subscribe({
            next: result => { console.log(result); },
            error: error => { console.log(error); }
        });

        targetButton.classList.add("disabled-button");
    }
}
