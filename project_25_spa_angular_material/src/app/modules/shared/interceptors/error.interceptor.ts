import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from "@angular/router";
import {ToastService} from "../services/toast.service";
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastService: ToastService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // console.log('ERROR INTERCEPTOR DETECTED');

    // @ts-ignore
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        /*if (event instanceof HttpResponse) {
          //   console.log('HttpResponse --->> ', event);
        }*/
        return event;
      })
      , catchError((err: HttpErrorResponse): Observable<any> => {
        // console.log('HttpErrorResponse ---> ', err);
        return new Observable(subscriber => {
          subscriber.error(this.handleError(request.url, err));
        });
      })
    );
  }

  private async handleError(url: string, err: HttpErrorResponse) {

    const error = {
      ok: err.ok,
      status: err.status,
      statusText: err.statusText,
      url: url,
      toast: true,
      toastText: `${err.status}: ${err.statusText}`,
    };

    // handle and modify response -- begin

    // handle token expiring with set redirect flag
    const currentUrl = error.url.replace(document.location.origin, '').split('?')[0];

    if (error.status === 401) {
      if (['/api/v1.0/auth/check'].includes(currentUrl.trim())) {
        error.toast = false;
      } else {
        if (['/api/v1.0/auth/signin'].includes(currentUrl.trim())) {
          error.toastText = 'Неверные данные для входа';
        }
      }
    }

    // handle and modify response -- end
    await this.errorActions(error);
    return error;
  }

  private async errorActions(error: any) {
    if (error.toast) {
      this.toastService.toast(error.toastText, 'error');
    }
  }

}
