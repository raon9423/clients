import { Component } from '@angular/core';
import { AdminProductComponent } from '../admin/admin-product/admin-product.component';
import { ProductComponent } from '../product/product.component';
import { CommonModule } from '@angular/common';
import { AdminCategoryComponent } from '../admin/admin-category/admin-category.component';
import { AdminNewComponent } from '../admin/admin-new/admin-new.component';
import { AdminOrderComponent } from '../admin/admin-order/admin-order.component';
import { AdminBrandComponent } from '../admin/admin-brand/admin-brand.component';
import { AdminBannerComponent } from '../admin/admin-banner/admin-banner.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [AdminProductComponent,ProductComponent,CommonModule,
    AdminCategoryComponent,AdminNewComponent,AdminOrderComponent, 
    AdminBrandComponent, HttpClientModule, AdminBannerComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  selectedComponent: string = '';

  onSelectComponent(component: string) {
    this.selectedComponent = component;
  }
}
