import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Service()
export class ProfileService {
  private readonly hp = inject(HttpClient);
  addressesCount = signal(0)

  updateLoggedUserData(data: object): Observable<any> {
    return this.hp.put(environment.baseUrl + `/api/v1/users/updateMe/`, data);
  }

  UpdateLoggedUserPassword(data: object): Observable<any> {
    return this.hp.put(environment.baseUrl + `/api/v1/users/changeMyPassword`, data);
  }
  deleteAddress(addressId:string): Observable<any> {
    return this.hp.delete(environment.baseUrl + `/api/v1/addresses/${addressId}`);
  }

  addAddress(data: object): Observable<any> {
    return this.hp.post(environment.baseUrl + `/api/v1/addresses`, data);
  } 
  getUserAddresses(){
    return this.hp.get(environment.baseUrl + `/api/v1/addresses`);
  }
}
