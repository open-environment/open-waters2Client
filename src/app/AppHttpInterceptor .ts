import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError, filter } from 'rxjs/operators';
let dummy = 0;

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    constructor() {}
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
      ): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
          filter(evt => event instanceof HttpResponse),
            tap((evt: HttpResponse<any>) => {
                if (evt instanceof HttpResponse) {
                    if (evt.body && evt.body.success)
                        dummy = 1;
                        // this.toasterService.success(evt.body.success.message, evt.body.success.title, { positionClass: 'toast-bottom-center' });
                }
            }),
            catchError((err: any) => {
                if (err instanceof HttpErrorResponse) {
                    try {
                      dummy = 2;
                        // this.toasterService.error(err.error.message, err.error.title, { positionClass: 'toast-bottom-center' });
                    } catch (e) {
                      dummy = 3;
                        // this.toasterService.error('An error occurred', '', { positionClass: 'toast-bottom-center' });
                    }
                    // log error
                }
                return of(err);
            }));

      }

}
