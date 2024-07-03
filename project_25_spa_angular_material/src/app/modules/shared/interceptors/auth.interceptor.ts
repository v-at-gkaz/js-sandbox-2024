import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../../environments/environment";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // console.log('AUTH INTERCEPTOR DETECTED');

    const excludedAuthURLs = environment.excludedAuthURLs;
    const jwt = localStorage.getItem('jwt') || '';
    const requestUrl = request.url.split('?')[0];

    if (jwt && jwt.length && !excludedAuthURLs.includes(requestUrl)) {

      // HttpHeader object immutable - copy values
      const headerSettings: { [name: string]: string | string[]; } = {};

      for (const key of request.headers.keys()) {
        // @ts-ignore
        headerSettings[key] = request.headers.getAll(key);
      }

      headerSettings['Authorization'] = 'Bearer ' + jwt;
      headerSettings['Content-Type'] = 'application/json';

      const newHeader = new HttpHeaders(headerSettings);
      const changedRequest = request.clone({headers: newHeader});
      return next.handle(changedRequest);
    }

    return next.handle(request);
  }
}
