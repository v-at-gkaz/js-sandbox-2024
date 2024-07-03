import {NgModule} from '@angular/core';
import {CommonModule, JsonPipe, NgForOf, NgOptimizedImage} from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';
import {SharedModule} from "../shared/shared.module";
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIconModule} from "@angular/material/icon";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatChipsModule} from "@angular/material/chips";
import { PageAdminComponent } from './components/page-admin/page-admin.component';

export const config: SocketIoConfig = {
  url: '/wss',
  options: {
    path: '/wss'
  }
};


@NgModule({
  declarations: [
    PageAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSlideToggleModule,
    SocketIoModule.forRoot(config),
    MatGridListModule,
    NgOptimizedImage,
    MatChipsModule,
    NgForOf
  ],
  providers: [
    {provide: JsonPipe }
  ]
})
export class AdminModule {
}
