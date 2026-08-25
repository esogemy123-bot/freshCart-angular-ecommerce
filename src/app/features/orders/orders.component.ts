import { CartService } from './../../core/services/cart.service';
import { Component, computed, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { CurrencyPipe, DatePipe, isPlatformBrowser } from '@angular/common';
import { Order } from '../../core/models/order.interface';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-orders',
  imports: [RouterLink, DatePipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  private readonly ordersService = inject(OrdersService);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  private readonly cartService = inject(CartService);
  isdetailsShown = signal<boolean>(false);
  ordersList = signal<Order[]>([]);
  userId = signal<string>('');
  ngOnInit(): void {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      this.getCartProducts();
    }
  }

  getCartProducts() {
    this.cartService.getCart().subscribe({
      next: (res) => {
        console.log(res);
        this.userId.set(res.data.cartOwner);
        if (this.userId() !== '') {
          this.getUserOrders();
        }
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }

  getUserOrders() {
    this.ordersService.getUserOrders(this.userId()).subscribe({
      next: (res) => {
        this.ordersList.set(
          (res as Order[]).map((order) => {
            order.isDetailsShown = false;
            return order;
          }),
        );
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  toggleDetails(order: Order) {
    order.isDetailsShown = !order.isDetailsShown;
  }
}
