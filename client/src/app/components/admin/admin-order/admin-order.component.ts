import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Order } from '../../../models/order.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin-order',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './admin-order.component.html',
  styleUrl: './admin-order.component.css'
})
export class AdminOrderComponent {
  httpClient = inject(HttpClient);
  data: Order[] = [];   

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.httpClient
      .get<{ message: string; data: Order[]; currentPage: number; totalPages: number; totalProducts: number }>(
        'http://localhost:3000/api/orders'
      )
      .subscribe(
        (response) => {
          this.data = response.data;
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
  }

  deleteProduct(item: Order) {
    const confirmed = confirm(`Bạn có chắc chắn muốn xóa sản phẩm: ${item.note}?`);
    if (confirmed) {
      this.httpClient
        .delete(`http://localhost:3000/api/orders/${item.id}`)
        .subscribe(
          () => {
            this.data = this.data.filter(product => product.id !== item.id);
            console.log(`Sản phẩm ${item.note} đã được xóa.`);
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
}