import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { SupplierService } from '../service/supplier.service';
import { MatDialog } from '@angular/material/dialog';
import { AddSupplierComponent } from '../add-supplier/add-supplier.component';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from '../../common/pipes/search.pipe';
import { DeleteAlertComponent } from 'src/app/common/component/delete-alert/delete-alert.component';
export interface Supplier {
  id: string;
  SupplierName: string;
  ContactNo: string;
}

@Component({
  selector: 'app-manage-supplier',
  templateUrl: './manage-supplier.component.html',
  styleUrls: ['./manage-supplier.component.scss']
})
export class ManageSupplierComponent implements OnInit {
  displayedColumns: string[] = ['id', 'SupplierName', 'ContactNumber','color'];
  dataSource: MatTableDataSource<Supplier>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private dialog: MatDialog,
    private toastr: ToastrService, private SupplierService: SupplierService) {
    // Assign the data to the data source for the table to render
   }

   ngOnInit() {
      this.fetchSuppliers();
  }
   fetchSuppliers() {
      this.SupplierService.getSuppliers().subscribe((data) => {

    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
      }, (err) => {
        this.toastr.error(err, 'Error')
      });
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
            this.SupplierService.deleteSupplier(id).subscribe(()=>{
              this.fetchSuppliers();
            });
          }

        });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Supplier Deleted successfully')
    });
  }
  onClickAddSuplier(id?:number) {
      let dialogRef = this.dialog.open(AddSupplierComponent, {
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
