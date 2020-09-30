import { Inject, Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NbAuthService } from '@nebular/auth';
import { NB_AUTH_TOKEN_INTERCEPTOR_FILTER } from '@nebular/auth';
import { AuthService } from './@core/auth/auth.service';

@Injectable()
export class NgxAuthJWTInterceptor implements HttpInterceptor {


  constructor(private authServ: AuthService,
    private injector: Injector,
    @Inject(NB_AUTH_TOKEN_INTERCEPTOR_FILTER) protected filter) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log(this.authServ.authorizationHeaderValue);
    request = request.clone({
      setHeaders: {
        Authorization: `${this.authServ.authorizationHeaderValue}`,
      },
    });
    return next.handle(request);
  }

  protected get authService(): NbAuthService {
    return this.injector.get(NbAuthService);
  }

}
