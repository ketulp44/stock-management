import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';


const routes: Routes = [

  {
    path: 'customers',
    component: DashboardComponent,
    children: [{
      path: '',
      loadChildren: () => import('./../../../customers/customers.module').then(m => m.CustomersModule)
    }]

  },
  {
    path: '',
    redirectTo: 'customers',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
