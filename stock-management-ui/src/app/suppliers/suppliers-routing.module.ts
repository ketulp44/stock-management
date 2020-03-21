import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageCustomerComponent } from './manage-supplier/manage-supplier.component';


const routes: Routes = [
  { path: '', component: ManageCustomerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliersRoutingModule { 
  constructor(){
  }
}
