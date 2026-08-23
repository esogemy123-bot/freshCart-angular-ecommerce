import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Service()
export class OrdersService {
  private readonly httpClient = inject(HttpClient);

  getUserOrders(userId: string): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/api/v1/orders/user/${userId}`);
  }
}
