import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';


const routes: Routes = [

  {
    path: 'suppliers',
    component: DashboardComponent,
    children: [{
      path: '',
      loadChildren: () => import('../../../suppliers/customers.module').then(m => m.CustomersModule)
    }]

  },
  {
    path: 'customers',
    component: DashboardComponent,
    children: [{
      path: '',
      loadChildren: () => import('./../../../customer/customer.module').then(m => m.CustomerModule)
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
