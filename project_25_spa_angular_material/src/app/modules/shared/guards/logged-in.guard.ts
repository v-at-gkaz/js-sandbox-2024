import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../../auth/services/auth.service";
import {ToastService} from "../services/toast.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService, private toastService: ToastService) {
  }

  // @ts-ignore
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isUserHasAccess().pipe(map(isUserHasAccess => {
      if (!!isUserHasAccess) {
        // this.toastService.toast('Вы уже в системе. Переход на главную...');
        this.router.navigate(['']).finally();
      }
      return !isUserHasAccess;
    }));
  }

}
