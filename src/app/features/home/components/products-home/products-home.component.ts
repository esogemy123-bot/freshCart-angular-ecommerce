import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../../../core/services/products.service';
import { Product } from '../../../../core/models/product.interface';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { H2Component } from '../../../../shared/ui/headings/h2/h2.component';
import { CartService } from '../../../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../../core/services/wishlist.service';
import { DiscountPercentagePipe } from '../../../../shared/pipes/discount-percentage-pipe';

@Component({
  selector: 'app-products-home',
  imports: [CurrencyPipe, RouterLink, H2Component, DiscountPercentagePipe],
  templateUrl: './products-home.component.html',
  styleUrl: './products-home.component.css',
})
export class ProductsHomeComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);
  allProducts = signal<Product[]>([]);
  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.allProducts.set(res.data);
        console.log(this.allProducts());
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
          this.toggleWishlist(productId);
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
  toggleWishlist(productId: string) {
    this.allProducts.update((currentProducts) =>
      currentProducts.map((product: any) => {
        if (product._id === productId) {
          product.isWishList = !product.isWishList;
        }
        return product;
      }),
    );
  }
}
