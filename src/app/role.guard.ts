import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles: string[] = route.data['expectedRoles'];
    
    // Redirect if not logged in
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/user-login']);
      return false;
    }

    const userRole = this.authService.getRole();

    // Redirect if role doesn't match
    if (!expectedRoles.includes(userRole)) {
      this.router.navigate(['/home']); // Optional: implement an Unauthorized page
      return false;
    }

    return true;
  }
}
