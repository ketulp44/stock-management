import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageSupplierComponent } from './manage-supplier/manage-supplier.component';


const routes: Routes = [
  { path: '', component: ManageSupplierComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliersRoutingModule { 
  constructor(){
  }
}
