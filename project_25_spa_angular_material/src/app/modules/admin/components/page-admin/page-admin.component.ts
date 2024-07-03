import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../services/users.service";
import {AuthService} from "../../../auth/services/auth.service";

@Component({
  selector: 'app-page-admin',
  templateUrl: './page-admin.component.html',
  styleUrls: ['./page-admin.component.scss']
})
export class PageAdminComponent implements OnInit {

  users: any[] = [];
  result = {};
  result2 = {};

  constructor(private apiSrv: UsersService, private authService: AuthService) {
  }

  ngOnInit() {
    this.apiSrv.getUsers().subscribe(
      (re: any) => {

        if(re.ok) {
          // ok
          this.users = re.body;

        } else {
          this.result2 = {
            status: 'NOT success',
            data: re.statusText
          }
        }

      },
      (er: any) => {
        // not ok
        this.result2 = {
          status: 'error',
          data: er.statusText
        }
      }
    )
  }

}
