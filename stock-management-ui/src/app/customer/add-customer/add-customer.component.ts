import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../service/customer.service';
import { MatDialogRef } from '@angular/material/dialog';
import { LoaderService } from 'src/app/common/service/loader.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {

  customer: any = {};
  displayProgressSpinner: boolean = false;
  constructor(private customerService: CustomerService,
    public dialogRef: MatDialogRef<AddCustomerComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public customerId: any
   ) { }

  ngOnInit() {
  
    if(this.customerId.dataKey) {
      this.customerService.getCustomer(this.customerId.dataKey).subscribe((data) => {
      this.customer = data;
      }, (error) => {
        this.toastr.error(error,'Error')
      })
    }
  }

  onSaveOrUpdate() {
    this.showLoader()
    this.customerService.saveOrUpdateCustomer(this.customer).subscribe((data) => {
      this.hideLoader();
      this.dialogRef.close('success');
      this.toastr.success('Supplier added sucessfully', 'Success');
    }, (error) => {
      this.hideLoader();
      this.toastr.error(error,'Error')
    })
  }
  closeDialog() {
    this.dialogRef.close('Pizza!');
  }
  showLoader() {
    this.displayProgressSpinner = true;
  }
  hideLoader() {
    this.displayProgressSpinner = false;
  }

}
