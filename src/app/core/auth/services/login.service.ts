import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Service()
export class LoginService {
  private readonly hp = inject(HttpClient);
  isLogged = signal<boolean>(false);

  signIn(data: object): Observable<any> {
    return this.hp.post(environment.baseUrl + `/api/v1/auth/signin`, data);
  }
}
