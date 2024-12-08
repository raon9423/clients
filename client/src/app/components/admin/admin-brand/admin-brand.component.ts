import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModel } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrandService } from '../../../services/brand.service';
import { Brand } from '../../../models/brand.model';

@Component({
  selector: 'app-admin-brand',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  providers: [BrandService],
  templateUrl: './admin-brand.component.html',
  styleUrls: ['./admin-brand.component.css']
})
export class AdminBrandComponent implements OnInit {
  httpClient = inject(HttpClient);
  data: Brand[] = [];
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.loadBrands();
  }

  loadBrands(): void {
    this.brandService.getBrands(this.currentPage).subscribe({
      next: (response) => {
        this.data = response.data;
        this.currentPage = response.currentPage;
        this.totalPages = response.totalPages
      },
      error: (error) => {
        console.error('Error fetching brands', error);
      }
    });
  }

  deleteBrand(brand: Brand): void {
    const confirmed = confirm(`Bạn có chắc chắn muốn xóa doanh mục: ${brand.name}?`);
    if (confirmed) {
      this.brandService.deleteBrand(brand.id).subscribe({
        next: () => {
          this.data = this.data.filter(b => b.id !== brand.id);
          console.log(`Danh mục ${brand.name} đã được xóa.`);
        },  
        error: (error) => {
          console.error('Error deleting brand', error);
        }
      });
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadBrands();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadBrands();
    }
  }
  
  updateBrand(id: number) {
    console.log(`Cập nhật sản phẩm với ID: ${id}`);
  }
}
