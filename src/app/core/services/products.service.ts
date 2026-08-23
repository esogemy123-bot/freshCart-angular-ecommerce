import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProductQueryParams } from '../models/product-query-params.interface';
@Service()
export class ProductsService {
  private readonly hpClient = inject(HttpClient);

  getAllProducts(params: ProductQueryParams = {}): Observable<any> {
    const page = params.page || 1;
    let url = `${environment.baseUrl}/api/v1/products/?page=${page}`;

    let queryParams: string[] = [];

    if (params.keyword) {
      queryParams.push(`keyword=${params.keyword}`);
    }
    if (params.limit) {
      queryParams.push(`limit=${params.limit}`);
    }
    if (params.sort) {
      queryParams.push(`sort=${params.sort}`);
    }
    if (params.fields) {
      queryParams.push(`fields=${params.fields}`);
    }
    if (params.priceGte) {
      queryParams.push(`price[gte]=${params.priceGte}`);
    }
    if (params.priceLte) {
      queryParams.push(`price[lte]=${params.priceLte}`);
    }

    // هندلة الـ Brand (لو جاية أري أو قيمة واحدة)
    if (params.brand) {
      if (Array.isArray(params.brand)) {
        params.brand.forEach((b) => queryParams.push(`brand=${b}`));
      } else {
        queryParams.push(`brand=${params.brand}`);
      }
    }

    // هندلة الـ Category (لو جاية أري أو قيمة واحدة)
    if (params.categoryId) {
      if (Array.isArray(params.categoryId)) {
        params.categoryId.forEach((cat) => queryParams.push(`category[in]=${cat}`));
      } else {
        queryParams.push(`category[in]=${params.categoryId}`);
      }
    }

    if (queryParams.length > 0) {
      url += `&${queryParams.join('&')}`;
    }

    return this.hpClient.get(url);
  }

  getSpecificProduct(productId: string): Observable<any> {
    return this.hpClient.get(environment.baseUrl + `/api/v1/products/${productId}`);
  }
}
