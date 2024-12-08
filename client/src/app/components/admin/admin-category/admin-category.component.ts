import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModel } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-admin-category',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './admin-category.component.html',
  styleUrl: './admin-category.component.css'
})
export class AdminCategoryComponent {
  httpClient = inject(HttpClient);
  data: Category[] = [];

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.httpClient
      .get<{ message: string; data: Category[]; currentPage: number; totalPages: number; totalProducts: number }>(
        'http://localhost:3000/api/categories'
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

  deleteProduct(item: Category) {
    const confirmed = confirm(`Bạn có chắc chắn muốn xóa doanh mục: ${item.name}?`);
    if (confirmed) {
      const token = localStorage.getItem('authToken'); // Assuming the token is stored in localStorage
      this.httpClient
        .delete(`http://localhost:3000/api/categories/${item.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .subscribe(
          () => {
            this.data = this.data.filter(product => product.id !== item.id);
            console.log(`Danh mục ${item.name} đã được xóa.`);
          },
          (error) => {
            console.error('Error deleting category', error);
          }
        );
    }
  }

  updateProduct(id: number) {
    console.log(`Cập nhật danh mục với ID: ${id}`);
  }
}