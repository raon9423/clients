import { ProductAttribute } from "./productattribute.model";
import { ProductImage } from "./productimages.model";

export class Product {
  id: number;
  name: string;
  image: string;
  price: number;
  oldPrice: number;
  description: string;
  specification: string;
  buyTurn: number;
  quantity: number;
  brandId: number;
  category_id: number;
  createdAt: Date;
  updatedAt: Date;
  productimages: ProductImage[]; 
  productattribute: ProductAttribute[]; 

  constructor(
    id: number,
    name: string,
    image: string,
    price: number,
    oldPrice: number,
    description: string,
    specification: string,
    buyTurn: number,
    quantity: number,
    brandId: number,
    category_id: number,
    createdAt: Date,
    updatedAt: Date,
    productimages: ProductImage[],
    productattribute: ProductAttribute[]
  ) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.price = price;
    this.oldPrice = oldPrice;
    this.description = description;
    this.specification = specification;
    this.buyTurn = buyTurn;
    this.quantity = quantity;
    this.brandId = brandId;
    this.category_id = category_id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.productimages = productimages;
    this.productattribute = productattribute;
  }
}
