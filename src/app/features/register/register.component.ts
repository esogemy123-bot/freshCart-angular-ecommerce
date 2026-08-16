import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegisterService } from '../../core/auth/services/register.service';
import { routes } from '../../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  // Pure UI interaction states (e.g., hover effects, dummy password visual indicator)
  private readonly formBuilder = inject(FormBuilder);
  private readonly registerService = inject(RegisterService);
  private readonly router = inject(Router);
  sending = signal<boolean>(false);

  registerForm: FormGroup = this.formBuilder.group(
    {
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
        ],
      ],
      rePassword: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    },
    { validators: [this.confirmPassword] },
  );

  submitForm() {
    this.signUp(this.registerForm.value);
  }
  passwordValue = signal<string>('');

  onPasswordInput(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.passwordValue.set(val);
  }
  confirmPassword(form: AbstractControl) {
    const password = form.get('password')?.value;
    const rePassword = form.get('rePassword')?.value;
    if (rePassword !== password && rePassword !== '') {
      form.get('rePassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    return null;
  }
  signUp(obj: object) {
    if (this.sending() === false) {
      if (this.registerForm.valid) {
        this.sending.set(true);
        this.registerService.signUp(obj).subscribe({
          next: (res) => {
            console.log(res);
            this.registerForm.reset();
            if (res.message === 'success') {
              this.router.navigate(['/login']);
            }
          },
          error: (err) => {
            console.log(err.message);
          },
        });
      } else {
        this.registerForm.markAllAsTouched();
      }
      this.sending.set(false);
    }
    return;
  }
}
