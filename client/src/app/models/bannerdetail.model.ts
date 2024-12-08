export class BannerDetail {
    id: number;
    productId: number;
    bannerId: number;
    createdAt: Date;
    updatedAt: Date;
  
    constructor(
      id: number,
      productId: number,
      bannerId: number,
      createdAt: Date,
      updatedAt: Date
    ) {
      this.id = id;
      this.productId = productId;
      this.bannerId = bannerId;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  