import { WishlistItem } from './../../core/models/wishlist-item.interface';
import { Component, inject, OnInit, signal } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';
import { Cart } from '../cart/models/cart.interface';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  wishlistProducts = signal<WishlistItem[]>([]);
  cart = signal<Cart>({} as Cart);

  ngOnInit(): void {
    this.getWishlistProducts();
    this.getCart();
  }

  getWishlistProducts() {
    this.wishlistService.getWishlist().subscribe({
      next: (res) => {
        console.log(res);
        this.wishlistProducts.set(res.data);
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }

  getCart() {
    this.cartService.getCart().subscribe({
      next: (res) => {
        console.log(res);
        this.cart.set(res.data);
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }

  removeItem(productId: string) {
    this.wishlistService.removeProductFromWishlist(productId).subscribe({
      next: (res) => {
        console.log(res);
        this.wishlistProducts.set(res.data);
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
  checkIfProductInCart() {
    const cartProductIds = this.cart().products.map((item: any) => item.product._id);

    // 3. دمج الحالة: لو منتج الويشليست موجود في الكارت، نخليه isInCart = true
    const updatedWishlist = this.wishlistProducts().map((product: any) => ({
      ...product,
      isInCart: cartProductIds.includes(product._id),
    }));

    this.wishlistProducts.set(updatedWishlist);
  }
}
