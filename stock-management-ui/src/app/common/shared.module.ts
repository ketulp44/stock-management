import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteAlertComponent } from './component/delete-alert/delete-alert.component';
import { SearchPipe } from './pipes/search.pipe';
import { MatSidenavModule, MatButtonToggleModule } from '@angular/material';



@NgModule({
  declarations: [DeleteAlertComponent,SearchPipe],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonToggleModule
  ],
  exports:[
    DeleteAlertComponent
  ],
  providers:[SearchPipe],
  entryComponents:[]
})
export class SharedModule { }
