import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      roleIds: [[]] // Initialize with an empty array or default role IDs
    });
  }
// to submit form 
  onSubmit() {
    if (this.form.valid) {
      // call userService to call api 
      this.userService.register(this.form.value).subscribe({
        next: () => {
          alert('User registered successfully!');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          if (err.status === 409) {
            alert('User already exists. Please register with different email.');
          } else {
            alert('Error registering user. Please try again later.');
          }
        }
      });
    }
  }
  
}// class ends
