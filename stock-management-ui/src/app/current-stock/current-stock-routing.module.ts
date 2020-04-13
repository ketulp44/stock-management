import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddToProcessingFormComponent } from './add-to-processing-form/add-to-processing-form.component';


const routes: Routes = [
  { path: '', component: AddToProcessingFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrentStockRoutingModule { }
