import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InwardFormComponent } from './inward-form/inward-form.component';


const routes: Routes = [
  { path: '', component: InwardFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InwardRoutingModule { }
