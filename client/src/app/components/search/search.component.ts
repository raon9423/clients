import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchTerm: string = '';
  products: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  searchProducts() {
    const apiUrl = `http://localhost:3000/api/products?search=${this.searchTerm}`;
    this.http.get(apiUrl).subscribe((response: any) => {
      this.products = response.data;
    });
  }

  goToProductDetails(productId: number) {
    // Implement navigation to product details page
  }

  addToCart(product: any) {
    // Implement add to cart functionality
  }
}