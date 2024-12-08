import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductComponent } from '../app/components/product/product.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { BannerComponent } from './components/banner/banner.component';
import { AdminBrandComponent } from './components/admin/admin-brand/admin-brand.component';
import { HttpClientModule } from '@angular/common/http';
import { OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { TestheaderComponent } from './components/testheader/testheader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
    HeaderComponent,
    SidebarComponent,
    ProductComponent,
    FooterComponent,
    HomeComponent,
    AdminComponent,
    LoginComponent,
    BannerComponent,
    AdminBrandComponent,
    HttpClientModule,
    TestheaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Raonus';
}