import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteAlertComponent } from './component/delete-alert/delete-alert.component';
import { SearchPipe } from './pipes/search.pipe';



@NgModule({
  declarations: [DeleteAlertComponent,SearchPipe],
  imports: [
    CommonModule
  ],
  exports:[
    DeleteAlertComponent
  ],
  providers:[SearchPipe],
  entryComponents:[]
})
export class SharedModule { }
