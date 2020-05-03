import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InwardFormComponent } from './inward-form/inward-form.component';
import { InwardStockListComponent } from './inward-stock-list/inward-stock-list.component';

const routes: Routes = [
  { path: '', component: InwardStockListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InwardRoutingModule { }
