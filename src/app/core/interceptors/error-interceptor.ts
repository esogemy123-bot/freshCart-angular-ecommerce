import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastrService = inject(ToastrService);
  const router = inject(Router);
  // req

  // res
  return next(req).pipe(
    catchError((err) => {
      if (err.error.message === 'User recently changed password! Please login again.') {
         router.navigate(['login'])
      }
      else if (err.error.message === 'Session expired! Please login again.') {
         router.navigate(['login'])
      }
      // show error --> toastr 
      console.log(err); 
      toastrService.error(err.error.message, 'FreshCart', {
        timeOut: 3000,
        progressBar: true,
        closeButton: true,
      });
      return throwError(() => err);
    }),
  );
};
