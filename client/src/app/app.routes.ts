import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminProductComponent } from './components/admin/admin-product/admin-product.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductComponent } from './components/product/product.component';
import { ShopComponent } from './components/shop/shop.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CartComponent } from './components/cart/cart.component';
import { ChatComponent } from '../app/components/chat/chat.component';

NgModule({ 
  declarations: [
    AdminProductComponent,
    LoginComponent,
    // SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AdminProductComponent]
})

export const routes: Routes = [
    { path: 'sidebar', component: SidebarComponent},
    { path: 'home', component: HomeComponent },
    { path: 'admin', component: AdminComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'product-details/:id', component: ProductDetailComponent },
    { path: 'shop', component: ShopComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'cart', component: CartComponent } ,
    { path: 'chat', component: ChatComponent }
];