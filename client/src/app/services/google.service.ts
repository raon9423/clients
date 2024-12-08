import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor() {}

  loginWithGoogle() {
    const googleUser = {
      name: 'Google User',
      email: 'user@gmail.com',
      phone: '123456789',
      avatar: 'http://localhost:3000/api/images/1733495120673-chill.webp'
    };
    this.userSubject.next(googleUser);
    localStorage.setItem('user', JSON.stringify(googleUser)); 
  }

  logout() {
    this.userSubject.next(null);
    localStorage.removeItem('user'); 
  }
}