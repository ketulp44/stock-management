import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import {MatTableModule} from '@angular/material/table'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material';


@NgModule({
  declarations: [CustomerListComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSortModule
  ],
  entryComponents:[]
})
export class CustomerModule { }
