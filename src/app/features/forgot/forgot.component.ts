import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForgetService } from '../../core/auth/services/forget.service';
import { log } from 'console';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.css',
})
export class ForgotComponent {
  private readonly forgetService = inject(ForgetService);
  private readonly router = inject(Router);
  step = signal<number>(1);
  email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  code: FormControl = new FormControl('', [Validators.required]);
  password: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
  ]);

  submitEmail(e: Event) {
    e.preventDefault();
    // generate data object
    const data = {
      email: this.email.value,
    };
    // send data to api
    this.forgetService.forgotPassword(data).subscribe({
      next: (res) => {
        console.log(res);
        this.step.set(2);
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }
  submitCode(e: Event) {
    e.preventDefault();
    // generate data object
    const data = {
      resetCode: this.code.value,
    };
    // send data to api
    this.forgetService.verifyCode(data).subscribe({
      next: (res) => {
        console.log(res);
        this.step.set(3);
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }
  submitPassword(e: Event) {
    e.preventDefault();
    // generate data object
    const data = {
      email: this.email.value,
      newPassword: this.password.value,
    };
    // send data to api
    this.forgetService.resetPassword(data).subscribe({
      next: (res) => {
        console.log(res);
        this.step.set(1);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }
}
