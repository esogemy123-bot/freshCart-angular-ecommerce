import { Component, inject, input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../../core/services/cart.service';
import { WishlistService } from '../../../../core/services/wishlist.service';
import { Product } from '../../../../core/models/product.interface';
import { RouterLink } from '@angular/router';
import { DiscountPercentagePipe } from '../../../pipes/discount-percentage-pipe';

@Component({
  selector: 'app-product',
  imports: [RouterLink, DiscountPercentagePipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);
  product = input<Product>();

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
  // toggleWishlist(productId: string) {
  //   this.allProducts.update((currentProducts) =>
  //     currentProducts.map((product: any) => {
  //       if (product._id === productId) {
  //         product.isWishList = !product.isWishList;
  //       }
  //       return product;
  //     }),
  //   );
  // }
}
