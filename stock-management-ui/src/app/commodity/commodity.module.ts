import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatPaginatorModule } from '@angular/material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { CommodityRoutingModule } from './commodity-routing.module';
import { ManageCommodityComponent } from './manage-commodity/manage-commodity.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../common/shared.module';



@NgModule({
  declarations: [ManageCommodityComponent],
  imports: [
    CommonModule,
    CommodityRoutingModule,
    FormsModule,
    SharedModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class CommodityModule { }
