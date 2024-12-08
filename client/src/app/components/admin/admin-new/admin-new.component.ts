import { Component, inject } from '@angular/core';
import { News } from '../../../models/new.model';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-new',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './admin-new.component.html',
  styleUrls: ['./admin-new.component.css']
})
export class AdminNewComponent {
  httpClient = inject(HttpClient);
  data: News[] = [];

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.httpClient
      .get<{ message: string; data: News[]; currentPage: number; totalPages: number; totalProducts: number }>(
        'http://localhost:3000/api/banners'
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
  deleteNew(item: News) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    const role = user?.role;
  
    console.log('User from localStorage:', user);
    console.log('Token from localStorage:', token);
  
    if (!token || role === undefined) {
      console.error('Không tìm thấy thông tin người dùng hoặc token.');
      return;
    }
  
    if (role !== 2) {
      console.error('Bạn không có quyền xóa sản phẩm này.');
      return;
    }
  
    const confirmed = confirm(`Bạn có chắc chắn muốn xóa sản phẩm: ${item.title}?`);
    if (confirmed) {
      this.httpClient
        .delete(`http://localhost:3000/api/banners/${item.id}`, {
          headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
        })
        .subscribe(
          () => {
            this.data = this.data.filter(product => product.id !== item.id);
            console.log(`Sản phẩm ${item.title} đã được xóa.`);
          },
          (error) => {
            console.error('Error deleting product', error);
            if (error.status === 500) {
              console.error('Internal Server Error. Please check the server logs for more details.');
            }
          }
        );
    }
  }

  updateProduct(id: number) {
    console.log(`Cập nhật sản phẩm với ID: ${id}`);
  }
}