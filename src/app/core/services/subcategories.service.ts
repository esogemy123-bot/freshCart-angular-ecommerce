import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Service()
export class SubcategoriesService {
  private readonly hpClient = inject(HttpClient);

  getAllSubcategories(): Observable<any> {
    return this.hpClient.get(environment.baseUrl + `/api/v1/subcategories`);
  }
  getSpecificSubcategory(subcategoryId: string): Observable<any> {
    return this.hpClient.get(environment.baseUrl + `/api/v1/subcategories/${subcategoryId}`);
  }
  GetAllSubCategoriesOnCategory(categoryId: string): Observable<any> {
    return this.hpClient.get(
      environment.baseUrl + `/api/v1/categories/${categoryId}/subcategories`,
    );
  }
}
