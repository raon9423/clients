export class ProductAttribute {
    id: number;
    product_id: number;
    attribute_id: number;
    value: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        id: number,
        product_id: number,
        attribute_id: number,
        value: string,
        createdAt: Date,
        updatedAt: Date
    ) {
        this.id = id;
        this.product_id = product_id;
        this.attribute_id = attribute_id;
        this.value = value;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
