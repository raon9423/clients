export class Feedback {
    id: number;
    productId: number;
    userId: number;
    star: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
  
    constructor(
      id: number,
      productId: number,
      userId: number,
      star: number,
      content: string,
      createdAt: Date,
      updatedAt: Date
    ) {
      this.id = id;
      this.productId = productId;
      this.userId = userId;
      this.star = star;
      this.content = content;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  