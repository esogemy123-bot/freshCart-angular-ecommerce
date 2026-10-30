import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ɵInternalFormsSharedModule,
} from '@angular/forms'; 
import { ProfileService } from '../../core/services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adress',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './adress.component.html',
  styleUrl: './adress.component.css',
})
export class AdressComponent implements OnInit{
  private readonly profileService = inject(ProfileService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  isLayoutOpen = signal<boolean>(false);
  addresses=signal<any[]>([]);

  address: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    details: ['', [Validators.required, Validators.minLength(3)]],
    phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    city: ['', [Validators.required, Validators.minLength(3)]],
  });
  ngOnInit(): void {
    this.getAdrresses();
  }
  getAdrresses() { 
      this.profileService.getUserAddresses().subscribe({
        next: (res) => {
          console.log(res); 
          this.addresses.set((res as any).data);
          this.profileService.addressesCount.set(this.addresses.length)
        },
      });
  }
  deleteAddress(id:string) { 
      this.profileService.deleteAddress(id).subscribe({
        next: (res) => {
          console.log(res); 
          console.log(this.addresses());
          if (res.status === 'success') {
          this.addresses.set((res as any).data);
            console.log(this.addresses());
          }
        },
      });
      console.log('deleted'); 
  }

  submitAddress() {
    if (this.address.valid) {
      this.profileService.addAddress(this.address.value).subscribe({
        next: (res) => {
          console.log(res);
          this.address.reset();
           this.addresses.set(res.data)
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
