import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessingRoutingModule } from './processing-routing.module';
import { ProcessingListComponent } from './processing-list/processing-list.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../common/shared.module';
import { MatSelectModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatPaginatorModule } from '@angular/material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';


@NgModule({
  declarations: [ProcessingListComponent],
  imports: [
    CommonModule,
    ProcessingRoutingModule,
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
export class ProcessingModule { }
