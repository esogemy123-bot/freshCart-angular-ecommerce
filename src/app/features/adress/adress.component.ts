import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { Router } from 'express';
import { ProfileService } from '../../core/services/profile.service';

@Component({
  selector: 'app-adress',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './adress.component.html',
  styleUrl: './adress.component.css',
})
export class AdressComponent {
  private readonly profileService = inject(ProfileService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  isLayoutOpen = signal<boolean>(false);

  address: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    details: ['', [Validators.required, Validators.minLength(3)]],
    phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    city: ['', [Validators.required, Validators.minLength(3)]],
  });

  submitAddress() {
    if (this.address.valid) {
      this.profileService.addAddress(this.address.value).subscribe({
        next: (res) => {
          console.log(res);
          this.address.reset;
          this.toggleLayout();
        },
      });
    } else {
      this.address.markAllAsTouched();
    }
  }

  toggleLayout() {
    this.isLayoutOpen.set(!this.isLayoutOpen());
  }
}
