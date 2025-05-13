import { Component , OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss'
})
export class UserLoginComponent implements OnInit {
  credentials = { email: '', password: '', role: 'ROLE_USER' };

  constructor(private authService: AuthService , private router: Router) {}
  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      const role = this.authService.getRole() || this.getRoleFromToken();
      if (role === 'ROLE_USER') {
        this.router.navigate(['/user-dashboard']);
      } else if (role === 'ROLE_ADMIN') {
        this.router.navigate(['/admin-dashboard']);
      }
    }
  }
  onSubmit() {
    this.authService.login(this.credentials).subscribe({
      next: () => {
        // Navigation is handled within the AuthService
      },
      error: err => {
        alert('Login failed');
      }
    });
  }
  getRoleFromToken(): string {
    const token = this.authService.getToken();
    if (!token) return '';

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload?.authorities?.[0] || '';
  }
}
