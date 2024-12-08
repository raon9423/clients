import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModel } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Product } from '../../models/product.model';
import { BannerComponent } from '../banner/banner.component';
import { ProductAttribute } from '../../models/productattribute.model';
import { ProductImage } from '../../models/productimages.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, HttpClientModule, BannerComponent, ProductDetailComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  httpClient = inject(HttpClient);
  data: Product[] = []; 
  route = inject(ActivatedRoute);
  productattribute: ProductAttribute[] = []; 
  productimages: ProductImage[] = [];

  product: any;

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id'); // Lấy ID từ URL
    if (productId) {
      this.fetchData(productId);
    }
    
  }
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }

  fetchData(id: string) {
    this.httpClient
      .get<{ message: string; data: Product; productattribute: ProductAttribute[], productimages: ProductImage[] }>(
        `http://localhost:3000/api/products/${id}`  // Sử dụng dấu backticks để truyền id
      )
      .subscribe(
        (response) => {
          this.data = [response.data];
          this.productattribute = response.productattribute;
          this.productimages = response.productimages;
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
  }
  

  deleteProduct(item: Product) {
    const confirmed = confirm(`Bạn có chắc chắn muốn xóa sản phẩm: ${item.name}?`);
    if (confirmed) {
      this.httpClient
        .delete(`http://localhost:3000/api/products/${item.id}`)
        .subscribe(
          () => {
            this.data = this.data.filter(product => product.id !== item.id);
            console.log(`Sản phẩm ${item.name} đã được xóa.`);
          },
          (error) => {
            console.error('Error deleting product', error);
          }
        );
    }
  }

  updateProduct(id: number) {
    console.log(`Cập nhật sản phẩm với ID: ${id}`);
  }

  addToCart(item: any) { 
    const cartId = localStorage.getItem('cart_id');
    if (!cartId) {
      console.error('Cart ID not found in localStorage');
      return;
    }
  
    const payload = {
      cart_id: parseInt(cartId, 10),
      product_id: item.id,
      quantity: 1 // You can adjust the quantity as needed
    };
  
    this.httpClient.post('http://localhost:3000/api/cartitems', payload).subscribe(
      (response: any) => {
        console.log(`Sản phẩm đã được thêm vào giỏ hàng có cart_id = ${cartId}:`, response);
  
        // Update localStorage with the new cart item
        let cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        cartItems.push(response.data);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
  
        console.log('Cart Item Local Storage', localStorage.getItem('cartItems'));
      },
      (error) => {
        console.error('Error adding item to cart', error);
      }
    );
  }
}