import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserLoginComponent } from './login/login.component';
import { RoleGuard } from './role.guard';



export const routes: Routes = [
    {
        path:"home",
        component: HomeComponent,
        title:"Home-page"

    }, 
    {
        path:"",
        component: HomeComponent,
        title:"Home-page"

    }, 
    { 
        path: 'user-register', 
        component: UserRegisterComponent 
    },
  { 
    path: 'login', 
    component: UserLoginComponent 
},

{
    path: 'user-dashboard',
    canActivate: [RoleGuard],
    data: { expectedRoles: ['ROLE_USER'] },
    loadComponent: () =>
        import('./user-dashboard/user-dashboard.component').then(m => m.UserDashboardComponent)
  }
  ,{
    path: 'admin-dashboard',
    loadComponent: () => import('./admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
    canActivate: [RoleGuard],
    data: { expectedRoles: ['ROLE_ADMIN'] }
  }
   
];
