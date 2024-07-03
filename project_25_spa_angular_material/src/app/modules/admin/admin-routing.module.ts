import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "../shared/guards/auth.guard";
import {PageAdminComponent} from "./components/page-admin/page-admin.component";

const routes: Routes = [
  {
    path: "admin",
    children: [
      {path: "users", component: PageAdminComponent, canActivate: [AuthGuard]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
