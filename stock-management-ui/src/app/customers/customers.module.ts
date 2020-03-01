import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersRoutingModule } from './customers-routing.module';
import { ManageCustomerComponent } from './manage-customer/manage-customer.component';
import { FormsModule } from '@angular/forms';
import { ContactValidatorDirective } from '../common/directive/contact-validator.directive';


@NgModule({
  declarations: [ManageCustomerComponent,ContactValidatorDirective],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    FormsModule
  ]
})
export class CustomersModule { }
