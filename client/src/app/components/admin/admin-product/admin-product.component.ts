import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { NgModel } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Product } from '../../../models/product.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-product',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {
  httpClient = inject(HttpClient);
  data: Product[] = [];
  currentPage = 1; 
  totalPages = 5;
  
  isAddProductFormVisible: boolean = false; 
  newProduct: any = { 
    name: '',
    price: 0,
    oldprice: 0,
    description: '',
    specification: '',
    buyTurn: 0,
    quantity: 0,
    category_id: null,
    brand_id: null
  };

  isProductListVisible: boolean = true; 

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.httpClient
      .get<{ message: string; data: Product[]; currentPage: number; totalPages: number; totalProducts: number }>(
        'http://localhost:3000/api/products'
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
          this.totalPages = response.totalPages; 
        },
        (error) => {
          console.error('Error loading data', error);
        }
      );
  }

  deleteProduct(item: Product) {
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

    const confirmed = confirm(`Bạn có chắc chắn muốn xóa sản phẩm: ${item.name}?`);
    if (confirmed) {
        this.httpClient
            .delete(`http://localhost:3000/api/products/${item.id}`, {
                headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
            })
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

  showAddProductForm() {
    this.isAddProductFormVisible = true;
    this.isProductListVisible = false; 
  }

  hideAddProductForm() {
    this.isAddProductFormVisible = false; 
    this.isProductListVisible = true;   
  }

  // resetNewProduct() {
  //   this.newProduct = {
  //     name: '',
  //     price: null,
  //     oldPrice: null,
  //     description: '',
  //     specification: '',
  //     buyTurn: null,
  //     quantity: null,
  //     category_id: null,
  //     brand_id: null
  //   }; // Đặt lại các trường thông tin sản phẩm mới
  // }

  onImageUpload(event: any) {
    const file = event.target.files[0];
  }

  addProduct() {
    const productData = {
        name: this.newProduct.name,
        image: this.newProduct.image, 
        price: this.newProduct.price,
        oldprice: this.newProduct.oldPrice, 
        description: this.newProduct.description,
        specification: this.newProduct.specification,
        buyturn: this.newProduct.buyTurn,
        quantity: this.newProduct.quantity,
        category_id: this.newProduct.category_id,
        brand_id: this.newProduct.brand_id
    };

    console.log('Dữ liệu sản phẩm mới:', productData); 
    this.httpClient.post('http://localhost:3000/api/products', productData)
      .subscribe(response => {
        console.log('Sản phẩm đã được lưu:', response);
        this.loadData(); 
        this.newProduct = {
          name: '',
          price: 0,
          oldPrice: 0,
          description: '',
          specification: '',
          buyTurn: 0,
          quantity: 0,
          category_id: null,
          brand_id: null
        };
        this.isAddProductFormVisible = false;
        this.isProductListVisible = true; 
      }, error => {
        console.error('Lỗi khi lưu sản phẩm:', error);
        console.error('Chi tiết lỗi:', error.error); 
      });
  }
}
