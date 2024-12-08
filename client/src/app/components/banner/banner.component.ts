import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModel } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Banner } from '../../models/banner.model';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {
  httpClient = inject(HttpClient);
  data: Banner[] = [];
  currentIndex: number = 0;

  constructor() {
    setInterval(() => {
      this.nextImage();
    }, 3000); 
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.httpClient
      .get<{ message: string; data: Banner[]; currentPage: number; totalPages: number; totalProducts: number }>(
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

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.data.length; 
  }

  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.data.length) % this.data.length;
  }
}
