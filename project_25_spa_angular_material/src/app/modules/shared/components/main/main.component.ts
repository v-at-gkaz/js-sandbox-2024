import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBar} from "@angular/material/snack-bar";
import {ToastService} from "../../services/toast.service";
import {timer} from "rxjs";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @Input() isMainPage = false;
  currentRole: string = 'anonymous';

  constructor(private toast: MatSnackBar, private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.toastService.toastObsvbl.subscribe(msg => {
      if (msg) {
        // @ts-ignore
        this.sendToast(msg.text, msg.type);
      }
    });
  }

  sendToast(text: string, type: 'success' | 'error' = 'success'): void {
    this.toast.openFromComponent(Toast, {data: {text, type}, verticalPosition: 'bottom'});
  }

}

// noinspection AngularMissingOrInvalidDeclarationInModule
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'toast',
  templateUrl: '../../toast/toast.html',
  styleUrls: ['../../toast/toast.scss'],
})
export class Toast {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: ToastData) {
  }
}

export interface ToastData {
  text: string;
  type: 'error' | 'success';
}
