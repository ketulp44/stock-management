import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path: 'dashboard', 
    
    loadChildren: () => import('./common/component/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },{
    path:'login',
    component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
