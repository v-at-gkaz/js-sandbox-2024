import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-page-sign-in',
  templateUrl: './page-sign-in.component.html',
  styleUrls: ['./page-sign-in.component.scss']
})
export class PageSignInComponent implements OnInit {

  title = 'SPA';

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title);
  }

  ngOnInit(): void {
  }

}
