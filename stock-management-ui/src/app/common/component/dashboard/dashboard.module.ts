import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import {
  MatTooltipModule, MatIconModule, MatSidenavModule,
  MatExpansionModule, MatListModule, MatButtonToggleModule,
  MatRippleModule,
} from '@angular/material';



@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatSidenavModule,
    MatExpansionModule,
    MatListModule,
    MatButtonToggleModule,
    MatRippleModule,
  ],
  bootstrap: [],
  exports: []
})
export class DashboardModule { }
