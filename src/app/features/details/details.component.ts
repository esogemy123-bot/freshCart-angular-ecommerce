import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../core/models/product.interface';
import { ProductsService } from '../../core/services/products.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-details',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  productId = signal<string>('');
  productTitle = signal<string>('');
  private readonly productsService = inject(ProductsService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);
  product = signal<Product>({} as Product);
  activeImage = signal<string>('');
  ngOnInit(): void {
    this.productId.set(this.activatedRoute.snapshot.paramMap.get('id')!);
    this.productTitle.set(this.activatedRoute.snapshot.paramMap.get('title')!);
    this.getSpecificProduct(this.productId());
  }
  getSpecificProduct(productId: string) {
    this.productsService.getSpecificProduct(productId).subscribe({
      next: (res) => {
        this.product.set(res.data);
        console.log(this.product());
      },
      error: (err) => {
        console.log(err);
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
          this.cartService.cartCount.set(res.numOfCartItems);
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

  addToWishlist(productId: string) {
    if (localStorage.getItem('freshToken')) {
      this.wishlistService.addProductToWishlist(productId).subscribe({
        next: (res) => {
          this.toastrService.success(res.message, 'FreshCart', {
            progressBar: true,
            closeButton: true,
          });
          // this.toggleWishlist(productId);
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
