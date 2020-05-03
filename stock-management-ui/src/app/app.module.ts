import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { AddSupplierComponent } from './suppliers/add-supplier/add-supplier.component';
import { ContactValidatorDirective } from './common/directive/contact-validator.directive';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoaderComponent } from './common/component/loader/loader.component';
import {OverlayModule} from '@angular/cdk/overlay';
import { ToastrModule } from 'ngx-toastr';
import {MatPaginatorModule} from '@angular/material/paginator';
import { DeleteAlertComponent } from './common/component/delete-alert/delete-alert.component';
import { SharedModule } from './common/shared.module';
import {MatTableModule} from '@angular/material/table'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { AddCustomerComponent } from './customer/add-customer/add-customer.component';
import { LoginComponent } from './login/login.component';
import { InwardFormComponent } from './inward/inward-form/inward-form.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatNativeDateModule, MatDatepickerModule, MatSelectModule } from '@angular/material';
import { AddCommodityComponent } from './commodity/add-commodity/add-commodity.component';
import { AddSubCommodityComponent } from './commodity/add-sub-commodity/add-sub-commodity.component';
import { AddToProcessingPopupComponent } from './current-stock/add-to-processing-popup/add-to-processing-popup.component';
import { MaxValidatorDirective } from './common/directive/max-validator.directive';
import { AddToProcessedComponent } from './processing/add-to-processed/add-to-processed.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddSupplierComponent,
    ContactValidatorDirective,
    MaxValidatorDirective,
    AddCustomerComponent,
    InwardFormComponent,
    AddCommodityComponent,
    AddSubCommodityComponent,
    AddToProcessingPopupComponent,
    AddToProcessedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    OverlayModule,
    ToastrModule.forRoot({
      timeOut: 2000
    }),
    MatPaginatorModule,
    SharedModule,
    MatTableModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgxMatSelectSearchModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[
    AddSupplierComponent,
    AddCustomerComponent,
    LoaderComponent,
    DeleteAlertComponent, 
    AddCommodityComponent, 
    AddSubCommodityComponent,
    InwardFormComponent,
    DeleteAlertComponent,
    AddToProcessingPopupComponent,
    AddToProcessedComponent
  ]
})
export class AppModule { }
