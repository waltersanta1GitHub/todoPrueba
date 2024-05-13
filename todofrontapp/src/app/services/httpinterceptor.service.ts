import { HttpInterceptorFn } from '@angular/common/http';

export const HttpCoreInterceptorHeader: HttpInterceptorFn = (req, next) => {
  const corsRequest = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    },
  });

  return next(corsRequest);
};
