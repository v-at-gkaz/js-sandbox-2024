import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageSignInComponent} from "./components/page-sign-in/page-sign-in.component";
import {LoggedInGuard} from "../shared/guards/logged-in.guard";
import {PageLogOutComponent} from "./components/page-log-out/page-log-out.component";
import {AuthGuard} from "../shared/guards/auth.guard";
import {PageSignUpComponent} from "./components/page-sign-up/page-sign-up.component";

const routes: Routes = [
  {
    path: "auth",
    children: [
      {path: "", component: PageSignInComponent, canActivate: [LoggedInGuard]},
      {path: "log-out", component: PageLogOutComponent, canActivate: [AuthGuard]},
      {path: "sign-up", component: PageSignUpComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
