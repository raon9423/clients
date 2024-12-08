export class News {
    id: number;
    title: string;
    image: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
  
    constructor(
      id: number,
      title: string,
      image: string,
      content: string,
      createdAt: Date,
      updatedAt: Date
    ) {
      this.id = id;
      this.title = title;
      this.image = image;
      this.content = content;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  