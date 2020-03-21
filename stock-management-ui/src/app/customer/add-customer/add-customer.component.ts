import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../suppliers/service/customer.service';
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

  supplier: any = {};
  displayProgressSpinner: boolean = false;
  constructor(private customerService: CustomerService,
    public dialogRef: MatDialogRef<AddCustomerComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public supplierId: any
   ) { }

  ngOnInit() {
  
    if(this.supplierId.dataKey) {
      this.customerService.getSupplier(this.supplierId.dataKey).subscribe((data) => {
      this.supplier = data;
      }, (error) => {
        this.toastr.error(error,'Error')
      })
    }
  }

  onSaveOrUpdate() {
    this.showLoader()
    this.customerService.saveOrUpdateSupplier(this.supplier).subscribe((data) => {
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