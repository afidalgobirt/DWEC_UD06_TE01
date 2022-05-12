export class SaleOrder {
    constructor(
        private id: number, //! Read only
        private clientId: number,
        private orderDateTime: Date, //! Read only
        private expectedDeliveryDate: Date,
        private deliveryDate: Date
    ) {}

    public getId(): number {
        return this.id;
    }

    //! The id is generated by the DB and should not be manually set.
    /* public setId(id: number): void {
        this.id = id;
    } */

    public getClientId(): number {
        return this.clientId;
    }

    public setClientId(clientId: number): void {
        this.clientId = clientId;
    }

    public getOrderDateTime(): Date {
        return this.orderDateTime;
    }

    //! The orderDateTime is generated by the DB and should not be manually set.
    /* public setOrderDateTime(orderDateTime: Date): void {
        this.orderDateTime = orderDateTime;
    } */

    public getExpectedDeliveryDate(): Date {
        return this.expectedDeliveryDate;
    }

    public setExpectedDeliveryDate(expectedDeliveryDate: Date): void {
        this.expectedDeliveryDate = expectedDeliveryDate;
    }

    public getDeliveryDate(): Date {
        return this.deliveryDate;
    }

    public setDeliveryDate(deliveryDate: Date): void {
        this.deliveryDate = deliveryDate;
    }
}
