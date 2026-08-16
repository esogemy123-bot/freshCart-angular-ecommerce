import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Service()
export class ProductsService {
  private readonly hpClient = inject(HttpClient);

  getAllProducts(): Observable<any> {
    return this.hpClient.get(environment.baseUrl + `/api/v1/products`);
  }
  getSpecificProduct(productId: string): Observable<any> {
    return this.hpClient.get(environment.baseUrl + `/api/v1/products/${productId}`);
  }
}
