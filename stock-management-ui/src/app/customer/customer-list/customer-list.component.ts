import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../service/customer.service';
import { DeleteAlertComponent } from 'src/app/common/component/delete-alert/delete-alert.component';

export interface Customer {
  id: string;
  CustomerName: string;
  ContactNo: string;
}

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'contctno','color'];
  dataSource: MatTableDataSource<Customer>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private dialog: MatDialog,
    private toastr: ToastrService,private CustomerService: CustomerService) {
      }

  ngOnInit() {
    this.fetchCustomers();
  }
  onClickAddCustomer(id?:number){
    let dialogRef = this.dialog.open(AddCustomerComponent, {
      height: '500px',
      width: '600px',
      data: {
        dataKey: id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.fetchCustomers();
    });
  }
  onClickRemoveCustomer(id:number) {
    let dialogRef = this.dialog.open(DeleteAlertComponent, {
      height: '300px',
      width: '600px',
      data: {
        header: 'Delete Alert',
        message: 'Are you sure want to delete Customer?' 
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.isConfirm == true){
        this.CustomerService.deleteCustomer(id).subscribe(()=>{
          this.fetchCustomers();
        });        
      }
      
    });

dialogRef.afterClosed().subscribe(result => {
});
}
  fetchCustomers() {
    this.CustomerService.getCustomers().subscribe((data) => {
    
  this.dataSource = new MatTableDataSource(data);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
    }, (err) => {
      this.toastr.error(err, 'Error')
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

