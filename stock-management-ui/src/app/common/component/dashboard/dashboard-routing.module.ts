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
    path: 'inward',
    component: DashboardComponent,
    children: [{
      path: '',
      loadChildren: () => import('./../../../inward/inward.module').then(m => m.InwardModule)
    }]
  },
  {
    path: 'commodities',
    component: DashboardComponent,
    children: [{
      path: '',
      loadChildren: () => import('./../../../commodity/commodity.module').then(m => m.CommodityModule)
    }]

  },
  {
    path: 'currentstocks',
    component: DashboardComponent,
    children: [{
      path: '',
      loadChildren: () => import('./../../../current-stock/current-stock.module').then(m => m.CurrentStockModule)
    }]

  },
  {
    path: 'processing',
    component: DashboardComponent,
    children: [{
      path: '',
      loadChildren: () => import('./../../../processing/processing.module').then(m => m.ProcessingModule)
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
