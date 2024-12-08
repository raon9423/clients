export class ProductImage {
    id: number;
    product_id: number;
    image_url: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        id: number,
        product_id: number,
        image_url: string,
        createdAt: Date,
        updatedAt: Date
    ) {
        this.id = id;
        this.product_id = product_id;
        this.image_url = image_url;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
