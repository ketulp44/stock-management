import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { InwardRoutingModule } from './inward-routing.module';
import { InwardFormComponent } from './inward-form/inward-form.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../common/shared.module';
import { MatButtonModule, MatInputModule, MatPaginatorModule, MatTableModule } from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import { InwardStockListComponent } from './inward-stock-list/inward-stock-list.component';


@NgModule({
  declarations: [ InwardStockListComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    InwardRoutingModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
  ]
})
export class InwardModule { }
