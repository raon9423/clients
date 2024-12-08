import { Component, inject } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-banner',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './admin-banner.component.html',
  styleUrls: ['./admin-banner.component.css']
})
export class AdminBannerComponent {
  httpClient = inject(HttpClient);
  banners: any[] = [];

  ngOnInit(): void {
    this.fetchBanners();
  }

  fetchBanners() {
    this.httpClient
      .get<{ message: string; data: any[] }>('http://localhost:3000/api/banners')
      .subscribe(
        (response) => {
          this.banners = response.data;
        },
        (error) => {
          console.error('Error fetching banners', error);
        }
      );
  }

  deleteBanner(banner: any) {
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
        console.error('Bạn không có quyền xóa banner này.');
        return;
    }

    const confirmed = confirm(`Bạn có chắc chắn muốn xóa banner: ${banner.title}?`);
    if (confirmed) {
        this.httpClient
            .delete(`http://localhost:3000/api/banners/${banner.id}`, {
                headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
            })
            .subscribe(
                () => {
                    this.banners = this.banners.filter(b => b.id !== banner.id);
                    console.log(`Banner ${banner.title} đã được xóa.`);
                },
                (error) => {
                    console.error('Error deleting banner', error);
                }
            );
    }
  }

  updateBanner(id: number) {
    console.log(`Cập nhật banner với ID: ${id}`);
  }
}