import {Component} from '@angular/core';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {ToastService} from "../../../../shared/services/toast.service";
import {timer} from "rxjs";

@Component({
  selector: 'app-form-sign-up',
  templateUrl: './form-sign-up.component.html',
  styleUrls: ['./form-sign-up.component.scss']
})
export class FormSignUpComponent {
  form = this.fb.group({
    login: [null, [Validators.required]],
    password: [null, [Validators.required]]
  });
  hide = true;

  constructor(private fb: UntypedFormBuilder, private authService: AuthService, private router: Router, private toastService: ToastService) {
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.authService.signup(this.form.value.login, this.form.value.password).subscribe(success => {
        if (success) {
          this.toastService.toast('Успешная регистрация');
          timer(2000).subscribe(()=>{
            this.router.navigate(['auth']).finally();
          });
        } else {
          this.toastService.toast('В процессе регистрации произошла ошибка', 'error');
        }
      });
    }
  }
}
