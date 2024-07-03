import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from './auth-routing.module';
import {PageSignInComponent} from './components/page-sign-in/page-sign-in.component';
import {SharedModule} from "../shared/shared.module";
import { FormSignInComponent } from './components/page-sign-in/form-sign-in/form-sign-in.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { PageLogOutComponent } from './components/page-log-out/page-log-out.component';
import {MatIconModule} from "@angular/material/icon";
import {FormSignUpComponent} from "./components/page-sign-up/form-sign-up/form-sign-up.component";
import {PageSignUpComponent} from "./components/page-sign-up/page-sign-up.component";


@NgModule({
  declarations: [
    PageSignInComponent,
    FormSignInComponent,
    FormSignUpComponent,
    PageSignUpComponent,
    PageLogOutComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class AuthModule {
}
