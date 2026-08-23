import { Observable, retry } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { environment } from '../../../environments/environment';

@Service()
export class CartService {
  private readonly httpClient = inject(HttpClient);
  cartIDs: string[] = [];
  userId = signal('');
  cartCount = signal<number>(0);
  addProduct(productId: string): Observable<any> {
    this.cartIDs.push(productId);
    localStorage.setItem('cartIDs', JSON.stringify(this.cartIDs));
    return this.httpClient.post(environment.baseUrl + `/api/v2/cart`, {
      productId: productId,
    });
  }
  getCart(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/api/v2/cart`);
  }
  updateCartProductQuantity(productId: string, count: number): Observable<any> {
    return this.httpClient.put(environment.baseUrl + `/api/v2/cart/${productId}`, {
      count: count,
    });
  }
  removeProduct(productId: string): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + `/api/v2/cart/${productId}`);
  }
  removeCart(): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + `/api/v2/cart`);
  }
  createCashOrder(cartId: string, data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `/api/v1/orders/${cartId}`, data);
  }
  createVisaOrder(cartId: string, data: object): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl + `/api/v1/orders/checkout-session/${cartId}?url=${environment.url}`,
      data,
    );
  }
}
