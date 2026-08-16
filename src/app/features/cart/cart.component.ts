import { CartService } from './../../core/services/cart.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Cart } from './models/cart.interface';
import { RouterLink } from '@angular/router';
import { TotalPricePipe } from '../../shared/pipes/total-price-pipe';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, TotalPricePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  cart = signal<Cart>({} as Cart);
  ngOnInit(): void {
    this.getCartProducts();
  }
  getCartProducts() {
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
    this.cartService.removeProduct(productId).subscribe({
      next: (res) => {
        console.log(res);
        this.cart.set(res.data);
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
