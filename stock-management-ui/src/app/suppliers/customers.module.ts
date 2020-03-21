import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersRoutingModule } from './customers-routing.module';
import { ManageCustomerComponent } from './manage-customer/manage-customer.component';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../common/pipes/search.pipe';
import {MatPaginatorModule} from '@angular/material/paginator';
import { SharedModule } from '../common/shared.module';
import { DeleteAlertComponent } from '../common/component/delete-alert/delete-alert.component';


@NgModule({
  declarations: [ManageCustomerComponent,SearchPipe],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    FormsModule,
    MatPaginatorModule,
    SharedModule
  ],
  entryComponents: [],
  exports: [],
  providers:[SearchPipe]
})
export class CustomersModule { }
