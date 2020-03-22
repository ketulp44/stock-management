import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageCommodityComponent } from './manage-commodity/manage-commodity.component';


const routes: Routes = [
  { path: '', component: ManageCommodityComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommodityRoutingModule { }
