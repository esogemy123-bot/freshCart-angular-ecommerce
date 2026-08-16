import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Service()
export class WishlistService {
  private readonly httpClient = inject(HttpClient);
  wishlistIDs: string[] = [];

  addProductToWishlist(productId: string): Observable<any> {
    this.wishlistIDs.push(productId);
    localStorage.setItem('wishlistIDs', JSON.stringify(this.wishlistIDs));
    return this.httpClient.post(environment.baseUrl + `/api/v1/wishlist`, {
      productId: productId,
    });
  }
  getWishlist(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/api/v1/wishlist`);
  }
  removeProductFromWishlist(productId: string): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + `/api/v1/wishlist/${productId}`);
  }
}
