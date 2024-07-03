import {Component} from '@angular/core';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {ToastService} from "../../../../shared/services/toast.service";

@Component({
  selector: 'app-form-sign-in',
  templateUrl: './form-sign-in.component.html',
  styleUrls: ['./form-sign-in.component.scss']
})
export class FormSignInComponent {
  form = this.fb.group({
    login: [null, [Validators.required]],
    password: [null, [Validators.required]]
  });
  hide = true;

  constructor(private fb: UntypedFormBuilder, private authService: AuthService, private router: Router, private toastService: ToastService) {
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.authService.signin(this.form.value.login, this.form.value.password).subscribe(success => {
        if (success) {
          this.toastService.toast('Успешный вход');
          this.router.navigate(['admin/users']).finally();
        }
      });
    }
  }
}
