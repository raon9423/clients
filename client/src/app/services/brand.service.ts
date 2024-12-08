import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Brand } from '../models/brand.model';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private apiUrl = 'http://localhost:3000/api/brands'; 

  constructor(private http: HttpClient) {}

  getBrands(page: number): Observable<{ message: string; data: Brand[]; currentPage: number; totalPages: number }> {
    return this.http.get<{ message: string; data: Brand[]; currentPage: number; totalPages: number }>(`${this.apiUrl}?page=${page}`)
      .pipe(map((response) => response));
  }

  insertBrand(brand: Brand): Observable<Brand> {
    return this.http.post<Brand>(this.apiUrl, brand);
  }

  updateBrand(id: number, brand: Brand): Observable<Brand> {
    return this.http.put<Brand>(`${this.apiUrl}/${id}`, brand);
  }
  
  deleteBrand(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
