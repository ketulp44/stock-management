import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrentStockRoutingModule } from './current-stock-routing.module';
import { AddToProcessingFormComponent } from './add-to-processing-form/add-to-processing-form.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../common/shared.module';
import { InwardRoutingModule } from '../inward/inward-routing.module';
import { MatSelectModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatPaginatorModule } from '@angular/material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';


@NgModule({
  declarations: [AddToProcessingFormComponent],
  imports: [
    CommonModule,
    CurrentStockRoutingModule,
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
export class CurrentStockModule { }
