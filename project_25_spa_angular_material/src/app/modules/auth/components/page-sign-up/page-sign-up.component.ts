import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-page-sign-up',
  templateUrl: './page-sign-up.component.html',
  styleUrls: ['./page-sign-up.component.scss']
})
export class PageSignUpComponent implements OnInit {

  title = 'SPA';

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title);
  }

  ngOnInit(): void {
  }

}
