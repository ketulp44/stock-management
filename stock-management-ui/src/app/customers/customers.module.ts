import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersRoutingModule } from './customers-routing.module';
import { ManageCustomerComponent } from './manage-customer/manage-customer.component';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../common/pipes/search.pipe';


@NgModule({
  declarations: [ManageCustomerComponent,SearchPipe],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    FormsModule
  ],
  entryComponents: [],
  exports: []
})
export class CustomersModule { }
