import { LoginService } from './../../core/auth/services/login.service';
import { CartService } from './../../core/services/cart.service';
import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { Cart } from './models/cart.interface';
import { RouterLink } from '@angular/router';
import { TotalPricePipe } from '../../shared/pipes/total-price-pipe';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, TotalPricePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly loginService = inject(LoginService);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  cart = signal<Cart>({} as Cart);
  logged = signal<boolean>(false);
  ngOnInit(): void {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      this.getCartProducts();
      this.logged.set(this.loginService.isLogged());
    }
  }
  getCartProducts() {
    this.cartService.getCart().subscribe({
      next: (res) => {
        console.log(res);
        this.cart.set(res.data);
        this.cartService.userId.set(res.data.cartOwner);
        localStorage.setItem('userId', res.data.cartOwner);
        console.log(this.cartService.userId());
        console.log(localStorage.getItem('userId'));
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }

  removeItem(productId: string) {
    this.cartService.removeProduct(productId).subscribe({
      next: (res) => {
        console.log(res);
        this.cart.set(res.data);
        this.cartService.cartCount.set(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }
  removeCartProducts() {
    this.cartService.removeCart().subscribe({
      next: (res) => {
        console.log(res);
        this.cart.set(res.data);
        this.cartService.cartCount.set(0);
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }
  updateItemCount(productId: string, count: number) {
    this.cartService.updateCartProductQuantity(productId, count).subscribe({
      next: (res) => {
        console.log(res);
        this.cart.set(res.data);
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }
}
