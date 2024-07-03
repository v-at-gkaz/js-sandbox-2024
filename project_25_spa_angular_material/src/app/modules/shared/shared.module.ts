import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from "./components/main/main.component";
import {RouterModule} from "@angular/router";
import {NavbarComponent} from './components/navbar/navbar.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@angular/material/snack-bar";
import {Toast} from "./components/main/main.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {SuccessInterceptor} from "./interceptors/success.interceptor";
import {ErrorInterceptor} from "./interceptors/error.interceptor";
import {MatGridListModule} from "@angular/material/grid-list";
import { PageMainComponent } from './components/page-main/page-main.component';


@NgModule({
    declarations: [
        MainComponent,
        NavbarComponent,
        PageMainComponent
    ],
    exports: [
        MainComponent
    ],
    imports: [
        HttpClientModule,
        CommonModule,
        RouterModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatGridListModule,
        MatSnackBarModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: SuccessInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true,
        },
        { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
    ]
})
export class SharedModule {
}
