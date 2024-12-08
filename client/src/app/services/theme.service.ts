import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkTheme = false;

  constructor() {
    this.darkTheme = localStorage.getItem('dark-theme') === 'true';
    this.applyTheme();
  }

  toggleTheme() {
    this.darkTheme = !this.darkTheme;
    localStorage.setItem('dark-theme', this.darkTheme.toString());
    this.applyTheme();
  }

  private applyTheme() {
    if (this.darkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}