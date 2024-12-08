import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any;
  showProfile: boolean = true;
  oldPassword: string = '';
  newPassword: string = '';

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}
  

  // ngOnInit(): void {
  //   const user = localStorage.getItem('user');
  //   if (user) {
  //     this.user = JSON.parse(user);
  //   } else {
  //     this.user = {}; 
  //   }
  // }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      const user = params['user'];
      if (user) {
        this.user = JSON.parse(user);
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          this.user = JSON.parse(storedUser);
        } else {
          console.error('User data not found in localStorage');
        }
      }
    });
  }

  toggleForms() {
    this.showProfile = !this.showProfile;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('images', file); // Ensure 'images' matches the field name expected by the server
  
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
      this.http.post('http://localhost:3000/api/images/upload', formData, { headers }).subscribe(
        (response: any) => {
          // Assuming the response contains the URL of the uploaded image
          this.user.avatar = `http://localhost:3000/api/images/${response.files[0]}`;
          localStorage.setItem('user', JSON.stringify(this.user)); // Update localStorage
        },
        (error) => {
          console.error('Error uploading image', error);
        }
      );
    }
  }

  onChangePassword() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const payload = {
      name: this.user.name,
      old_password: this.oldPassword,
      new_password: this.newPassword
    };

    this.http.post(`http://localhost:3000/api/users/${this.user.id}`, payload, { headers }).subscribe(
      response => {
        console.log('Password updated successfully', response);
        this.toggleForms();
      },
      error => {
        console.error('Error updating password', error);
      }
    );  
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}