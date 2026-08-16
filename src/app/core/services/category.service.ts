import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Service()
export class CategoryService {
  private readonly hpClient = inject(HttpClient);

  getAllCategories(): Observable<any> {
    return this.hpClient.get(environment.baseUrl + `/api/v1/categories`);
  }
  getSpecificCategory(categoryId: string): Observable<any> {
    return this.hpClient.get(environment.baseUrl + `/api/v1/categories/${categoryId}`);
  }
}
