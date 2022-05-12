export class Product {
    constructor(
        public id: number,
        public name: string,
        public stock: number,
        public unitOfMeasure: string,
        public pricePerUnit: number
    ) {}

    /* public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getStock(): number {
        return this.stock;
    }

    public setStock(stock: number): void {
        this.stock = stock;
    }

    public getUnitOfMeasure(): string {
        return this.unitOfMeasure;
    }

    public setUnitOfMeasure(unitOfMeasure: string): void {
        this.unitOfMeasure = unitOfMeasure;
    }

    public getPricePerUnit(): number {
        return this.pricePerUnit;
    }

    public setPricePerUnit(pricePerUnit: number): void {
        this.pricePerUnit = pricePerUnit;
    } */
}
