export class Order {
    id: number;
    userId: number;
    note: string;
    total: number;
    createdAt: Date;
    updatedAt: Date;
  
    constructor(
      id: number,
      userId: number,
      note: string,
      total: number,
      createdAt: Date,
      updatedAt: Date
    ) {
      this.id = id;
      this.userId = userId;
      this.note = note;
      this.total = total;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  