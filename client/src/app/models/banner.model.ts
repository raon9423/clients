export class Banner {
    id: number;
    name: string;
    image: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;
  
    constructor(
      id: number,
      name: string,
      image: string,
      status: number,
      createdAt: Date,
      updatedAt: Date
    ) {
      this.id = id;
      this.name = name;
      this.image = image;
      this.status = status;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  