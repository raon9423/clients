import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { NgModel } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Product } from '../../models/product.model';
import { BannerComponent } from '../banner/banner.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, HttpClientModule, BannerComponent, ProductDetailComponent],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  httpClient = inject(HttpClient);
  data: Product[] = []; 
  products: any[] = [];
  allProducts: Product[] = [];  
  limit = 12;
  currentPage = 1; 
  totalPages = 5;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.fetchData();
    this.loadProducts();
  }

  fetchData() {
    this.httpClient
      .get<{ message: string; data: Product[]; currentPage: number; totalPages: number; totalProducts: number }>(
        'http://localhost:3000/api/products?page=1'
      )
      .subscribe(
        (response) => {
          this.data = response.data; 
          const totalPages = response.totalPages;
          for (let page = 2; page <= totalPages; page++) {
            this.loadMoreData(page);
          }
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

  goToProductDetails(id: number) {
    this.router.navigate(['/product-details', id]);
  }

  updateProduct(id: number) {
    console.log(`Cập nhật sản phẩm với ID: ${id}`);
  }

  loadProducts() {
    this.httpClient
      .get<{ message: string; data: Product[]; currentPage: number; totalPages: number; totalProducts: number }>(
        `http://localhost:3000/api/products?page=${this.currentPage}` 
      )
      .subscribe(
        (response) => {
          this.data = response.data; 
          this.totalPages = response.totalPages; 
        },
        (error) => {
          console.error('Error loading data', error);
        }
      );
  }

  addToCart(item: any) { 
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      console.error('User ID not found');
      return;
    }
  
    const cartId = localStorage.getItem('cart_id');
    if (!cartId) {
      console.error('Cart ID not found');
      return;
    }
  
    const cartItem = {
      cart_id: parseInt(cartId, 10), 
      product_id: item.id,
      quantity: 1 
    };
    console.log("cartItem", cartId);
    console.log('Adding item to cart with cart_id:', cartItem.cart_id);
  
    this.httpClient.post('http://localhost:3000/api/cartitems', cartItem).subscribe(
      (response: any) => {
        console.log(`Item added to cart with cart_id: ${cartItem.cart_id}`, response);
      },
      (error: any) => {
        console.error('Error adding item to cart:', error);
      }
    );
  }

  loadMoreData(page: number) {
    this.httpClient
      .get<{ message: string; data: Product[] }>(`http://localhost:3000/api/products?page=${page}`)
      .subscribe(
        (response) => {
          this.data = [...this.data, ...response.data];
        },
        (error) => {
          console.error('Error fetching data for page ' + page, error);
        }
      );
  }
}