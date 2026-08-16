import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Service()
export class ForgetService {
  private readonly hp = inject(HttpClient);

  forgotPassword(data: object): Observable<any> {
    return this.hp.post(environment.baseUrl + `/api/v1/auth/forgotPasswords`, data);
  }
  verifyCode(data: object): Observable<any> {
    return this.hp.post(environment.baseUrl + `/api/v1/auth/verifyResetCode`, data);
  }
  resetPassword(data: object): Observable<any> {
    return this.hp.put(environment.baseUrl + `/api/v1/auth/resetPassword`, data);
  }
}
