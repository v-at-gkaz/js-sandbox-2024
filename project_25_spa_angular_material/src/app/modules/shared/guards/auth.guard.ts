import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import {AuthService} from "../../auth/services/auth.service";
import {ToastService} from "../services/toast.service";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService, private toastService: ToastService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isUserHasAccess().pipe(map(isUserHasAccess => {
      if (!isUserHasAccess) {
        this.toastService.toast('Доступ запрещён. Переход на страницу входа...', 'error');
        this.router.navigate(['/auth']).finally();
      }
      return !!isUserHasAccess;
    }));
  }
}
