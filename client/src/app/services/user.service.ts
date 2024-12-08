import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, credentials);
  }

  updateUser(userId: number, userData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/${userId}`, userData);
  }
}
