import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [RouterLink, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  private readonly formBuilder = inject(FormBuilder);
  private readonly cartService = inject(CartService);
  id = signal('');
  payMethod = signal<string>('cash');
  ngOnInit(): void {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      this.activatedRoute.paramMap.subscribe((params) => {
        this.id.set(params.get('id')!);
        console.log(this.id());
      });
    }
  }

  checkOut: FormGroup = this.formBuilder.group({
    shippingAddress: this.formBuilder.group({
      city: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      details: ['', [Validators.required]],
    }),
  });

  submitData() {
    if (this.checkOut.valid) {
      if (this.payMethod() === 'cash') {
        this.payCash();
        console.log(this.checkOut.value());
      } else {
        this.payVisa();
      }
    }
  }
  changepayMethod(payMethod: HTMLInputElement) {
    this.payMethod.set(payMethod.value);
  }
  payCash() {
    this.cartService.createCashOrder(this.id(), this.checkOut.value).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.router.navigate(['/allorders']);
        }
      },
    });
  }
  payVisa() {
    this.cartService.createVisaOrder(this.id(), this.checkOut.value).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          window.open(res.session.url, '_self');
        }
      },
    });
  }
}
