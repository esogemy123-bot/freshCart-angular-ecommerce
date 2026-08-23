import { Component, inject, OnInit, signal } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { BrandItem } from '../brands/brand-item.interface';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';
import { DiscountPercentagePipe } from '../../shared/pipes/discount-percentage-pipe';
import { Brand } from '../../core/models/brand.interface';

@Component({
  selector: 'app-brand-details',
  imports: [RouterLink, DiscountPercentagePipe],
  templateUrl: './brand-details.component.html',
  styleUrl: './brand-details.component.css',
})
export class BrandDetailsComponent implements OnInit {
  private readonly brandsService = inject(BrandsService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  brandId = signal('');
  brand = signal<Brand>({} as Brand);
  brandDetails = signal<BrandItem[]>([]);

  ngOnInit(): void {
    this.brandId.set(this.activatedRoute.snapshot.paramMap.get('id')!);
    console.log('Brand ID:', this.brandId);
    if (this.brandId()) {
      this.getSpecificBrandProducts();
      this.getSpecificBrand(this.brandId());
    }
  }

  getSpecificBrand(brandId: string) {
    this.brandsService.getSpecificBrand(brandId).subscribe({
      next: (res) => {
        console.log(res);
        this.brand.set(res.data);
        console.log(this.brand());
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }

  getSpecificBrandProducts() {
    this.brandsService.getSpecificBrandProducs(this.brandId()!).subscribe({
      next: (res) => {
        console.log(res);
        this.brandDetails.set(res.data);
        console.log(this.brandDetails());
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }

  addProductToCart(productId: string) {
    if (localStorage.getItem('freshToken')) {
      this.cartService.addProduct(productId).subscribe({
        next: (res) => {
          this.toastrService.success(res.message, 'FreshCart', {
            progressBar: true,
            closeButton: true,
          });
        },
        error: (err) => {
          this.toastrService.warning(err.message, 'FreshCart', {
            progressBar: true,
            closeButton: true,
          });
        },
      });
    }
  }
}
