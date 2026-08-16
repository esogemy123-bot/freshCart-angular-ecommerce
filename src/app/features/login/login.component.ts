import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../core/auth/services/login.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly loginService = inject(LoginService);
  private readonly router = inject(Router);
  sending = signal<boolean>(false);
  fb = new FormBuilder();
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
      ],
    ],
  });

  submitForm() {
    this.signIn(this.loginForm.value);
  }

  signIn(data: object) {
    if (this.sending() === false) {
      if (this.loginForm.valid) {
        this.sending.set(true);
        this.loginService.signIn(data).subscribe({
          next: (res) => {
            console.log(res);
            this.loginForm.reset();
            if (res.message === 'success') {
              localStorage.setItem('freshToken', res.token);
              localStorage.setItem('freshUser', JSON.stringify(res.user));
              this.loginService.isLogged.set(true);
              this.router.navigate(['']);
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
      } else {
        this.loginForm.markAllAsTouched();
      }
      this.sending.set(false);
    }
    return;
  }
}
