import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from '../service/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from './../../common/pipes/search.pipe';
import { DeleteAlertComponent } from 'src/app/common/component/delete-alert/delete-alert.component';


@Component({
  selector: 'app-manage-customer',
  templateUrl: './manage-customer.component.html',
  styleUrls: ['./manage-customer.component.scss']
})
export class ManageCustomerComponent implements OnInit {
  suppliers: any[] = [];
  searchString = "";
  totalLength: number = 0;
  allSupplier: any[] = [];
  pageObj: any = {};
  pageSize: number = 5;
  index: number = 5;
  constructor(
    private customerService: CustomerService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private searchPipe: SearchPipe
  ) { }

  ngOnInit() {
    this.fetchSuppliers();
  }
  fetchSuppliers() {
    this.customerService.getSuppliers().subscribe((data) => {
      this.allSupplier = data;
      this.suppliers = this.allSupplier.slice(0, this.pageSize);
      this.totalLength = this.allSupplier.length;


    }, (err) => {
      this.toastr.error(err, 'Error')
    });
  }
  onClickAddSuplier(id?:number) {
    let dialogRef = this.dialog.open(AddCustomerComponent, {
      height: '500px',
      width: '600px',
      data: {
        dataKey: id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.fetchSuppliers();
    });
  }
  onSaveOrUpdate() {

  }
  onClickRemoveSupplier(id:number) {
    let dialogRef = this.dialog.open(DeleteAlertComponent, {
      height: '300px',
      width: '600px',
      data: {
        header: 'Delete Alert',
        message: 'Are you sure want to delete Supplier?' 
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.isConfirm == true){
        this.customerService.deleteSupplier(id).subscribe(()=>{
          this.fetchSuppliers();
        });        
      }
      
    });

  }
  changePage(suppliers) {
    this.totalLength=suppliers.length;
    let start = this.pageObj.pageIndex * this.pageObj.pageSize;
    let calEnd = this.pageObj.pageIndex * this.pageObj.pageSize + this.pageObj.pageSize;
    let end = (calEnd > this.pageObj.length) ? this.pageObj.length : calEnd;
    this.suppliers = suppliers.slice(start, end);
  }
  onFilter() {
    this.changePage(this.searchPipe.transform(this.allSupplier, this.searchString));
  }
  pageEvent(event) {
    this.pageObj = event
    this.onFilter();

  }
  
}
