import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

export interface Customer {
  id: string;
  name: string;
  progress: string;
  color: string;
}
const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'progress', 'color'];
  dataSource: MatTableDataSource<Customer>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private dialog: MatDialog,
    private toastr: ToastrService,) {
    const users:Customer []= [{
      id: '1',
      color:'yellow',
      name:'ketul',
      progress:'10'
    },
    {
      id: '2',
      color:'yellow',
      name:'harsh',
      progress:'10'
    },
    {
      id: '3',
      color:'yellow',
      name:'kadam',
      progress:'10'
    },
    {
      id: '4',
      color:'yellow',
      name:'dhruv',
      progress:'10'
    },
    {
      id: '5',
      color:'yellow',
      name:'rohan',
      progress:'10'
    },
    {
      id: '6',
      color:'yellow',
      name:'raj',
      progress:'10'
    },
    {
      id: '7',
      color:'yellow',
      name:'narendra',
      progress:'10'
    },
    {
      id: '8',
      color:'yellow',
      name:'mohan',
      progress:'10'
    }];
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
   }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  onClickAdd(id?:number){
    console.log('add called');
    let dialogRef = this.dialog.open(AddCustomerComponent, {
      height: '500px',
      width: '600px',
      data: {
        dataKey: id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('customer added successfully')
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

