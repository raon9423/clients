import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  providers: [UserService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  showRegisterForm: boolean = false;
  showForgotPasswordForm: boolean = false;
  showOtpForm: boolean = false;

  registerEmail: string = '';
  registerPassword: string = '';
  registerName: string = '';
  registerPhone: string = '';

  forgotPasswordEmail: string = '';
  otp: string = '';
  newPassword: string = '';

  constructor(private userService: UserService, private router: Router, private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    console.log('Token from localStorage:', token);
    console.log('User from localStorage:', user);

    if (token && user) {
      this.router.navigate(['/user-profile'], { state: { user: JSON.parse(user) } });
    }

    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      const user = params['user'];
      if (token && user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', user);
        this.router.navigate(['/user-profile'], { state: { user: JSON.parse(user) } });
      }
    });
  }

  toggleForm() {
    this.showRegisterForm = !this.showRegisterForm;
  }

  toggleForgotPasswordForm() {
    this.showForgotPasswordForm = !this.showForgotPasswordForm;
  }

  onSubmit() {
    console.log('Login form submitted');
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    this.userService.login({ email: this.email, password: this.password }).subscribe(
      response => {
        console.log('Login successful:', response);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('role', response.data.user.role);
        this.router.navigate(['/user-profile']);
      },
      error => {
        console.error('Login error:', error);
        this.errorMessage = error.error.message || 'Đã xảy ra lỗi trong quá trình đăng nhập';
      }
    );
  }

  onRegister() {
    console.log('Register form submitted');
    console.log('Email:', this.registerEmail);
    console.log('Password:', this.registerPassword);
    console.log('Name:', this.registerName);
    console.log('Phone:', this.registerPhone);

    this.userService.register({
      email: this.registerEmail,
      password: this.registerPassword,
      name: this.registerName,
      phone: this.registerPhone
    }).subscribe(
      response => {
        console.log('Register successful:', response);
        this.toggleForm();
      },
      error => {
        console.error('Register error:', error);
        this.errorMessage = error.error.message || 'Đã xảy ra lỗi trong quá trình đăng ký';
      }
    );
  }

  sendOtp() {
    console.log('Sending OTP to:', this.forgotPasswordEmail);
    this.http.post('http://localhost:3000/api/send-otp', { email: this.forgotPasswordEmail }).subscribe(
      (response: any) => {
        console.log('OTP sent:', response);
        this.showOtpForm = true;
        this.errorMessage = ''; 
      },
      (error: any) => {
        console.error('Error sending OTP:', error);
        console.error('Full error response:', error);
        this.showOtpForm = true;
        this.errorMessage = error.error?.message || 'Đã xảy ra lỗi trong quá trình gửi OTP';
      }
    );
  }

  verifyOtp() {
    console.log('Verifying OTP for:', this.forgotPasswordEmail);
    this.http.post('http://localhost:3000/api/verify-otp', {
      email: this.forgotPasswordEmail,
      otp: this.otp,
      newPassword: this.newPassword
    }).subscribe(
      response => {
        console.log('OTP verified and password changed:', response);
        this.showOtpForm = false;
        this.showForgotPasswordForm = false;
      },
      error => {
        console.error('Error verifying OTP:', error);
        this.errorMessage = error.error.message || 'Đã xảy ra lỗi trong quá trình xác minh OTP';
      }
    );
  }
  loginWithGoogle() {
    console.log('Attempting to log in with Google');
    window.location.href = 'http://localhost:3000/auth/google';
  }
  
  handleGoogleLoginResponse(response: any) {
    if (response && response.user) {
      localStorage.setItem('user', JSON.stringify(response.user));
      this.router.navigate(['/user-profile']);
    } else {
      console.error('Google login failed:', response);
    }
  }
}