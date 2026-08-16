import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastrService = inject(ToastrService);
  // req

  // res
  return next(req).pipe(
    catchError((err) => {
      // show error --> toastr
      toastrService.error(err.error.message, 'FreshCart', {
        timeOut: 3000,
        progressBar: true,
        closeButton: true,
      });

      return throwError(() => err);
    }),
  );
};
