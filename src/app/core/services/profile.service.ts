import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Service()
export class ProfileService {
  private readonly hp = inject(HttpClient);

  updateLoggedUserData(data: object): Observable<any> {
    return this.hp.put(environment.baseUrl + `/api/v1/users/updateMe/`, data);
  }

  UpdateLoggedUserPassword(data: object): Observable<any> {
    return this.hp.put(environment.baseUrl + `/api/v1/users/changeMyPassword`, data);
  }

  addAddress(data: object): Observable<any> {
    return this.hp.put(environment.baseUrl + `/api/v1/addresses`, data);
  }
}
