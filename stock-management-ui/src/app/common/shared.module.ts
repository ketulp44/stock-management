import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteAlertComponent } from './component/delete-alert/delete-alert.component';



@NgModule({
  declarations: [DeleteAlertComponent],
  imports: [
    CommonModule
  ],
  exports:[
    DeleteAlertComponent
  ],
  entryComponents:[]
})
export class SharedModule { }
