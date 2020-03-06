import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { AddCustomerComponent } from './customers/add-customer/add-customer.component';
import { ContactValidatorDirective } from './common/directive/contact-validator.directive';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoaderComponent } from './common/component/loader/loader.component';
import {OverlayModule} from '@angular/cdk/overlay';
import { ToastrModule } from 'ngx-toastr';
import {MatPaginatorModule} from '@angular/material/paginator';
import { SearchPipe } from './common/pipes/search.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddCustomerComponent,
    ContactValidatorDirective,
    LoaderComponent
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
    MatPaginatorModule
  ],
  providers: [SearchPipe],
  bootstrap: [AppComponent],
  entryComponents:[AddCustomerComponent,LoaderComponent]
})
export class AppModule { }
