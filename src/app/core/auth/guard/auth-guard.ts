import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const pLATFORM_ID = inject(PLATFORM_ID);
  const loginService = inject(LoginService);
  const router = inject(Router);

  if (isPlatformBrowser(pLATFORM_ID)) {
    if (localStorage.getItem('freshToken') && loginService.isLogged()) {
      return true;
    } else {
      return router.parseUrl('/login');
    }
  }
  return true;
};
