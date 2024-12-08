import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  onSubmit(event: Event) {
    event.preventDefault();
    console.log('Đã gửi form đăng ký');
  }
}
