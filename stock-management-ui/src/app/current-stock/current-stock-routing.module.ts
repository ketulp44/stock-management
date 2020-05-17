import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddToProcessingFormComponent } from './add-to-processing-form/add-to-processing-form.component';
import { ProcessedCurrentStockListComponent } from './processed-current-stock-list/processed-current-stock-list.component';


const routes: Routes = [
  { path: '', component: AddToProcessingFormComponent },
  { path: 'processed', component: ProcessedCurrentStockListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrentStockRoutingModule { }
