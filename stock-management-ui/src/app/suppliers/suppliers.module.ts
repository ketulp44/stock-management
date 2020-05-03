import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuppliersRoutingModule } from './suppliers-routing.module';
import { ManageSupplierComponent } from './manage-supplier/manage-supplier.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { SharedModule } from '../common/shared.module';
import { DeleteAlertComponent } from '../common/component/delete-alert/delete-alert.component';
import {MatTableModule} from '@angular/material/table'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule, MatTooltipModule } from '@angular/material';


@NgModule({
  declarations: [ManageSupplierComponent],
  imports: [
    CommonModule,
    SuppliersRoutingModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSortModule,
    MatTooltipModule
  ],
  entryComponents: [],
  exports: [],
  providers:[]
})
export class SuppliersModule { }
