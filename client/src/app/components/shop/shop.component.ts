import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Product } from '../../models/product.model';
import { BannerComponent } from '../banner/banner.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, HttpClientModule, BannerComponent, ProductDetailComponent, FormsModule],
  templateUrl: './shop.component.html',
  providers: [LanguageService],
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  httpClient = inject(HttpClient);
  data: Product[] = []; 
  allProducts: Product[] = [];  
  filteredData: Product[] = [];
  categories: { id: number, name: string }[] = []; 
  limit = 12;
  currentPage = 1; 
  totalPages = 5;
  selectedCategory = '';
  searchTerm: string = '';
  products: any[] = [];
  isEnglish: boolean = false;

  productTitle: string = 'Sản Phẩm';
  searchPlaceholder: string = 'Nhập tên sản phẩm';
  searchButtonText: string = 'Tìm Kiếm';
  allCategoriesText: string = 'Tất cả';
  addToCartText: string = 'Thêm Vào Giỏ Hàng';

  constructor(private router: Router, private http: HttpClient, private languageService: LanguageService) {}

  ngOnInit(): void {
    this.fetchData();
    this.loadCategories();
    this.languageService.currentLanguage.subscribe(isEnglish => {
      this.isEnglish = isEnglish;
      this.updateLanguageText();
    });
  }

  searchProducts() {
    const apiUrl = `http://localhost:3000/api/products?search=${this.searchTerm}`;
    this.http.get(apiUrl).subscribe((response: any) => {
      this.products = response.data;
      this.filteredData = this.products; // Update filteredData with the search results
    });
  }

  goToProductDetails(id: number) {
    this.router.navigate(['/product-details', id]);
  }

  fetchData() {
    const limit = 12;  
    let currentPage = 1;
    this.httpClient
      .get<{ message: string; data: Product[]; currentPage: number; totalPages: number; totalProducts: number }>(
        `http://localhost:3000/api/products?page=${currentPage}&limit=${limit}`
      )
      .subscribe(
        (response) => {
          this.data = response.data; 
          this.filteredData = this.data;
          const totalPages = response.totalPages;

          for (let page = 2; page <= totalPages; page++) {
            this.loadMoreData(page, limit);
          }
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
  }

  loadMoreData(page: number, limit: number) {
    this.httpClient
      .get<{ message: string; data: Product[] }>(`http://localhost:3000/api/products?page=${page}&limit=${limit}`)
      .subscribe(
        (response) => {
          this.data = [...this.data, ...response.data]; 
          this.filteredData = this.data;
        },
        (error) => {
          console.error('Error fetching data for page ' + page, error);
        }
      );
  }

  loadCategories() {
    this.httpClient
      .get<{ message: string; data: { id: number, name: string }[] }>('http://localhost:3000/api/categories')
      .subscribe(
        (response) => {
          this.categories = response.data;
        },
        (error) => {
          console.error('Error fetching categories', error);
        }
      );
  }

  onCategoryChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedCategory = selectElement.value;
    this.filterProducts();
  }

  filterProducts() {
    console.log('Selected category:', this.selectedCategory); // Log giá trị của selectedCategory
  
    if (this.selectedCategory) {
      console.log('Before filtering, data:', this.data); // Log dữ liệu ban đầu
      this.filteredData = this.data.filter(item => {
        console.log('Checking item:', item); // Log từng phần tử trong data
        return item.category_id === parseInt(this.selectedCategory, 10);
      });
      console.log('After filtering, filteredData:', this.filteredData); // Log dữ liệu sau khi lọc
    } else {
      console.log('No category selected, using full data');
      this.filteredData = this.data;
    }
  
    console.log('Final filteredData:', this.filteredData); // Log kết quả cuối cùng
  }
  

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadData(); 
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadData(); 
    }
  }

  loadData() {
    this.httpClient
      .get<{ message: string; data: Product[]; currentPage: number; totalPages: number; totalProducts: number }>(
        `http://localhost:3000/api/products?page=${this.currentPage}` 
      )
      .subscribe(
        (response) => {
          this.data = response.data; 
          this.filteredData = this.data;
          this.totalPages = response.totalPages; 
        },
        (error) => {
          console.error('Error loading data', error);
        }
      );
  }

  updateProduct(id: number) {
    console.log(`Cập nhật sản phẩm với ID: ${id}`);
  }

  addToCart(item: any) { 
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

  private updateLanguageText() {
    if (this.isEnglish) {
      this.productTitle = 'Products';
      this.searchPlaceholder = 'Enter product name';
      this.searchButtonText = 'Search';
      this.allCategoriesText = 'All';
      this.addToCartText = 'Add to Cart';
    } else {
      this.productTitle = 'Sản Phẩm';
      this.searchPlaceholder = 'Nhập tên sản phẩm';
      this.searchButtonText = 'Tìm Kiếm';
      this.allCategoriesText = 'Tất cả';
      this.addToCartText = 'Thêm Vào Giỏ Hàng';
    }
  }
}