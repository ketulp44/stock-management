import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';


import { CommodityRoutingModule } from './commodity-routing.module';
import { ManageCommodityComponent } from './manage-commodity/manage-commodity.component';



@NgModule({
  declarations: [ManageCommodityComponent],
  imports: [
    CommonModule,
    CommodityRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule
  ]
})
export class CommodityModule { }
