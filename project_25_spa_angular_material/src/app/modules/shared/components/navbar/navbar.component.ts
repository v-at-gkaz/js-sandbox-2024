import {Component, Input, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {AuthService} from "../../../auth/services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() isMainPage = false;
  @Input() currentRole: string = 'anonymous';

  items: Array<NavbarItem> = [
    {
      route: '/admin/users',
      title: 'Пользователи',
      show: true,
      draft: false,
      icon: 'people'
    },
    {
      route: '/auth',
      title: 'Вход',
      show: true,
      draft: false,
      icon: 'input'
    },
    {
      route: '/auth/log-out',
      title: 'Выход',
      show: true,
      draft: false,
      icon: 'logout'
    },
    {
      route: '/auth/sign-up',
      title: 'Регистрация',
      show: true,
      draft: false,
      icon: 'input'
    }

  ];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.isUserHasAccess().subscribe(isUserHasAccess => {
      this.items[0].show = !!isUserHasAccess;
      this.items[2].show = !!isUserHasAccess;
      this.items[1].show = !isUserHasAccess;
      this.items[3].show = !isUserHasAccess;
    });
  }

}

export interface NavbarItem {
  route: string;
  title: string;
  show: boolean;
  icon: string;
  draft: boolean;
}
