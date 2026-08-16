import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Service()
export class RegisterService {
  private readonly hp = inject(HttpClient);

  signUp(object: object): Observable<any> {
    return this.hp.post(environment.baseUrl + `/api/v1/auth/signup`, object);
  }
}
