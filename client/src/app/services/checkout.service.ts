import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private apiUrl = 'http://localhost:3000/api/carts/checkout'; 

  constructor(private http: HttpClient) {}

  checkoutCart(cartId: number, total: number, note: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/checkout`, { cart_id: cartId, total, note });
  }
}