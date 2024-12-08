import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ThemeService } from '../../services/theme.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  providers: [ThemeService, LanguageService],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isMenuOpen: boolean = false;
  isAdmin: boolean = false;

  homeText: string = 'Trang Chủ';
  shopText: string = 'Sản Phẩm';
  cartText: string = 'Giỏ Hàng';
  searchText: string = 'Nhắn Tin';
  loginText: string = 'Đăng Nhập';
  adminText: string = 'Quản Trị Viên';
  interfaceText: string = 'Giao Diện';
  languageButtonText: string = 'Ngôn Ngữ';
  isEnglish: boolean = false;

  constructor(private router: Router, private themeService: ThemeService, private languageService: LanguageService) {}

  ngOnInit() {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.isAdmin = parsedUser.role === 2;
    }

    this.languageService.currentLanguage.subscribe(isEnglish => {
      this.isEnglish = isEnglish;
      this.updateLanguageText();
    });
  }

  toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  navigateToAdmin() {
    this.router.navigate(['/admin']);
  }

  changeTheme() {
    this.themeService.toggleTheme();
  }

  changeLanguage() {
    this.languageService.toggleLanguage();
  }

  private updateLanguageText() {
    if (this.isEnglish) {
      this.homeText = 'Home';
      this.shopText = 'Shop';
      this.cartText = 'Cart';
      this.searchText = 'Search';
      this.loginText = 'Login';
      this.adminText = 'Admin';
      this.interfaceText = 'Interface';
      this.languageButtonText = 'Language';
    } else {
      this.homeText = 'Trang Chủ';
      this.shopText = 'Sản Phẩm';
      this.cartText = 'Giỏ Hàng';
      this.searchText = 'Nhắn Tin';
      this.loginText = 'Đăng Nhập';
      this.adminText = 'Quản Trị Viên';
      this.interfaceText = 'Giao Diện';
      this.languageButtonText = 'Ngôn Ngữ';
    }
  }
}