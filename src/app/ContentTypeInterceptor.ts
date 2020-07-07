import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ContentTypeInterceptor implements HttpInterceptor {

  public constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const ct = req.detectContentTypeHeader();
    if (ct != null) {
      return next.handle(req.clone({
        setHeaders: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
    }));
    }else {
      return next.handle(req);
    }
  }
}
