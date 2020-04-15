import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteAlertComponent } from './component/delete-alert/delete-alert.component';
import { SearchPipe } from './pipes/search.pipe';
import { MatSidenavModule, MatButtonToggleModule } from '@angular/material';
import { LoaderComponent } from './component/loader/loader.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatProgressSpinnerModule } from '@angular/material';
import { MaxValidatorDirective } from './directive/max-validator.directive';



@NgModule({
  declarations: [DeleteAlertComponent,SearchPipe,LoaderComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    OverlayModule
  ],
  exports:[
    DeleteAlertComponent,
    LoaderComponent
  ],
  providers:[SearchPipe],
  entryComponents:[]
})
export class SharedModule { }
