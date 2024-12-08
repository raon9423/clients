import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ProductComponent } from '../product/product.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [SidebarComponent,ProductComponent,HttpClientModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}