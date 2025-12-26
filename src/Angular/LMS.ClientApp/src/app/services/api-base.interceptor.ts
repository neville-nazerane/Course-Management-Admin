
import { HttpInterceptorFn } from '@angular/common/http';

export const apiBaseInterceptor: HttpInterceptorFn = (req, next) => {
  const apiReq = req.clone({
    url: `https://localhost:7283/${req.url}`
  });

  return next(apiReq);
};
