import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../service/customer.service';
import { MatDialogRef } from '@angular/material/dialog';
import { LoaderService } from 'src/app/common/service/loader.service';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService
   ) { }

  ngOnInit() {
    
    
  }

  onSaveOrUpdate() {
    console.log(this.supplier);
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
