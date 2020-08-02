import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler):  Observable<HttpEvent<any>> {
    if (request.url.includes('/auth/login') || request.url.includes('/auth/signup') || request.url.includes('/auth/forgotpassword')
      || request.url.includes('/auth/resetpassword') || request.url.includes('/home')
    ) {
      return next.handle(request).pipe(catchError(this.handleError));      
    }
    let token = this.auth.fetchToken();
    request = request.clone({
      headers: request.headers.set('Authorization', `${token}`),
    });
    return next.handle(request)
      .pipe(catchError((err: HttpResponse<any>) => {
        if (err.status === 401) {
          // if (err.body.RequireRefreshToken) {
          //   this.token.getRefeshToken();
          //   next.handle(request);
          // } else {
            this.auth.logout();
          // }
        } else if (err.status === 500 || err.status === 404) {
          return throwError('Something bad happened. Please try again later.');
        }    
      }));
  }

  private handleError(error: HttpResponse<any>) {
    if (error.status === 401) {
      // if (error.body.RequireRefreshToken) {
      //   // this.token.getRefeshToken();

      // } else {
        this.auth.logout();
      // }
    } else if (error.status === 500 || error.status === 404) {
      return throwError('Something bad happened. Please try again later.');
    }
  };
}
