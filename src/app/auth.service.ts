import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private role: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string; password: string; role:String }) {
    debugger
    return this.http.post<any>('http://localhost:8080/api/users/login', credentials, { withCredentials: true })
      .pipe(
        tap(response => {
          const returnedRole = response.roles[0];
  if (credentials.role !== returnedRole) {
    alert('Selected role does not match your account role.');
    return;
  }
          localStorage.setItem('jwtToken', response.token);
          localStorage.setItem('expiresAt', response.expiresAt);
          localStorage.setItem('userRole', response.roles[0]);
          this.role = response.roles[0]; // Adjust based on your response structure

          // Redirect based on role
          if (this.role === 'ROLE_USER') {
            console.log("role user")
            this.router.navigate(['/user-dashboard']);
          } else if (this.role === 'ROLE_ADMIN') {
            this.router.navigate(['/admin-dashboard']);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userRole');
    this.role = '';
    this.router.navigate(['/login']);
  }
  
  isLoggedIn(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('jwtToken');
  }
  
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('jwtToken');
  }

  
  getRole(): string {
    if (this.role) return this.role;
    return localStorage.getItem('userRole') || '';
  }
}