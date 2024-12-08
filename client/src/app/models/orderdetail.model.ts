export class OrderDetail {
    id: number;
    orderId: number;
    productId: number;
    price: number;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
  
    constructor(
      id: number,
      orderId: number,
      productId: number,
      price: number,
      quantity: number,
      createdAt: Date,
      updatedAt: Date
    ) {
      this.id = id;
      this.orderId = orderId;
      this.productId = productId;
      this.price = price;
      this.quantity = quantity;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  