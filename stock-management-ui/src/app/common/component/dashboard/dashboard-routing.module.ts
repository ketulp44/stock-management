import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { LoginComponent } from 'src/app/login/login.component';


const routes: Routes = [

  {
    path: 'suppliers',
    component: DashboardComponent,
    children: [{
      path: '',
      loadChildren: () => import('../../../suppliers/suppliers.module').then(m => m.SuppliersModule)
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
