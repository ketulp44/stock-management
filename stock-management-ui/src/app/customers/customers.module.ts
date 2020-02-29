import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { ManageCustomerComponent } from './manage-customer/manage-customer.component';


@NgModule({
  declarations: [ManageCustomerComponent],
  imports: [
    CommonModule,
    CustomersRoutingModule
  ]
})
export class CustomersModule { }
