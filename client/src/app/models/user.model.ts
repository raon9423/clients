export class User {
    id: number;
    email: string;
    password: string;
    name: string;
    role: number;
    avatar: string;
    phone: number;
    createdAt: Date;
    updatedAt: Date;
  
    constructor(
      id: number,
      email: string,
      password: string,
      name: string,
      role: number,
      avatar: string,
      phone: number,
      createdAt: Date,
      updatedAt: Date
    ) {
      this.id = id;
      this.email = email;
      this.password = password;
      this.name = name;
      this.role = role;
      this.avatar = avatar;
      this.phone = phone;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  