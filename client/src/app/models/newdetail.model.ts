export class NewsDetail {
    id: number;
    productId: number;
    newsId: number;
    createdAt: Date;
    updatedAt: Date;
  
    constructor(
      id: number,
      productId: number,
      newsId: number,
      createdAt: Date,
      updatedAt: Date
    ) {
      this.id = id;
      this.productId = productId;
      this.newsId = newsId;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  