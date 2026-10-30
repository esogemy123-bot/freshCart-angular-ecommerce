import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
} from '@angular/forms'; 
import { ProfileService } from '../../core/services/profile.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common'; 

@Component({
  selector: 'app-settings',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent implements OnInit {
  private readonly profileService = inject(ProfileService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  userId = signal<string>('');
  ngOnInit(): void {
    if (isPlatformBrowser(this.pLATFORM_ID)) {  
      this.userId.set(localStorage.getItem('userId')!)
    }
  }
  information: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
  });
  changePassword: FormGroup = this.formBuilder.group(
    {
      currentPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
        ],
      ],
      rePassword: ['', Validators.required],
    },
    { validators: [this.confirmPassword] },
  );

  submitInformation() {
    if (this.information.valid) {
      this.profileService.updateLoggedUserData(this.information.value).subscribe({
        next: (res) => {
          console.log(res);
          this.information.reset();
        },
      });
    } else {
      this.information.markAllAsTouched();
    }
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
  submitNewPassword() {
    if (this.changePassword.valid) {
      this.profileService.UpdateLoggedUserPassword(this.changePassword.value).subscribe({
        next: (res) => {
          console.log(res);
          this.changePassword.reset;
          localStorage.setItem('freshToken', res.token);
          this.router.navigate(['/login']);
        },
      });
    } else {
      this.changePassword.markAllAsTouched();
    }
  }
}
