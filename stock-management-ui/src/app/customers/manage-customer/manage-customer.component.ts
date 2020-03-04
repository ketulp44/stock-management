import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from '../service/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-manage-customer',
  templateUrl: './manage-customer.component.html',
  styleUrls: ['./manage-customer.component.scss']
})
export class ManageCustomerComponent implements OnInit {
  suppliers: any[] = [];
  searchString="";
  constructor(
    private customerService: CustomerService, 
    private dialog: MatDialog,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.fetchSuppliers();
  }
  fetchSuppliers() {
    this.customerService.getSuppliers().subscribe((data) => {
      console.log(data);
      
      this.suppliers = data;
     
    }, (err) => {
      this.toastr.error(err,'Error')
    });
  }
  onClickAddSuplier() {
    console.log('on click add ');

    let dialogRef = this.dialog.open(AddCustomerComponent, {
      height: '600',
      width: '800px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`); // Pizza!
    });
  }
  onSaveOrUpdate() {

  }
}
