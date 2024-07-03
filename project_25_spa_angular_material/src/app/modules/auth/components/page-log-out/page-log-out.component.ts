import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {timer} from "rxjs";

@Component({
  selector: 'app-page-log-out',
  templateUrl: './page-log-out.component.html',
  styleUrls: ['./page-log-out.component.scss']
})
export class PageLogOutComponent implements OnInit {

  title = 'SPA';

  constructor(private titleService: Title, private router: Router) {
    this.titleService.setTitle(this.title);
  }

  ngOnInit(): void {
    localStorage.removeItem('jwt');
    timer(300).subscribe(() => {
      this.router.navigate(['']).finally();
    });
  }

}
