import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('usertoken') && req.url.indexOf('basicauth') === -1) {
      const request = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Basic ${window.btoa(/*this.userService.user.name*/'user' + ':' + /*this.userService.user.password*/'password')}`
        })
      });
      return next.handle(request);
    } else {
      return next.handle(req);
    }
  }
}
