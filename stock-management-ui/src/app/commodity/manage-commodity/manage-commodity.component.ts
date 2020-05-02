import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { CommodityService } from '../services/commodity.service';
import { DeleteAlertComponent } from 'src/app/common/component/delete-alert/delete-alert.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material';
import { AddCommodityComponent } from '../add-commodity/add-commodity.component';
import { AddSubCommodityComponent } from '../add-sub-commodity/add-sub-commodity.component';

export interface Commodity {
  id: string;
  CommodityName: string;
  SubCommodities:SubCommodity [] | MatTableDataSource<SubCommodity>
}
export interface  SubCommodity{
  SubCommodityID: number;
  SubCommodityName:string;
  
}
@Component({
  selector: 'app-manage-commodity',
  templateUrl: './manage-commodity.component.html',
  styleUrls: ['./manage-commodity.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class ManageCommodityComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'color'];
  dataSource: MatTableDataSource<Commodity>;
  expandedElement: Commodity | null;
  innerDisplayedColumns: string[] = ['id','name','color']
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private dialog: MatDialog, private toastr: ToastrService, private CommodityService: CommodityService,
    private cd: ChangeDetectorRef) {
    // Assign the data to the data source for the table to render
  }

  ngOnInit() {
    this.fetchCommodities();
  }
  fetchCommodities() {
    this.CommodityService.getCommodityWithSubCommodities().subscribe((data) => {
      
      data = data.map((x:any)=>{
        x.SubCommodities = new MatTableDataSource(x.SubCommodities);
        console.log(x);
        return x;
      })
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
     console.log(this.dataSource);
     
      
      // this.expandedElement = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    }, (err) => {
      console.log(err);
      this.toastr.error(err, 'Error')
    });
  }
  onClickAddCommodity(id?: number) {
    let dialogRef = this.dialog.open(AddCommodityComponent, {
      height: '500px',
      width: '600px',
      data: {
        dataKey: id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.fetchCommodities();
    });
  }
  onClickAddSubCommodity(id?: number) {
    let dialogRef = this.dialog.open(AddSubCommodityComponent, {
      height: '500px',
      width: '600px',
      data: {
        dataKey: id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.fetchCommodities();
    });
  }
  onClickRemoveCommodity(id: number) {
    let dialogRef = this.dialog.open(DeleteAlertComponent, {
      height: '300px',
      width: '600px',
      data: {
        header: 'Delete Alert',
        message: 'Are you sure want to delete Commodity?All SubCommodities will be deleted!'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.isConfirm == true) {
        this.CommodityService.deleteCommodity(id).subscribe((data) => {
          this.fetchCommodities();
        });
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Supplier Deleted successfully')
    });
  }
  onClickRemoveSubCommodity(id: number) {
    let dialogRef = this.dialog.open(DeleteAlertComponent, {
      height: '300px',
      width: '600px',
      data: {
        header: 'Delete Alert',
        message: 'Are you sure want to delete Sub Commodity?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.isConfirm == true){
        this.CommodityService.saveOrUpdateSubCommodity(id).subscribe((data)=>{
          console.log(data);
          
          this.fetchCommodities();
        });        
      }
      
    });

dialogRef.afterClosed().subscribe(result => {
  console.log('Supplier Deleted successfully')
});
  }
  toggleRow(element: Commodity) {
    element.SubCommodities && (element.SubCommodities as MatTableDataSource<SubCommodity>).data.length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;
    this.cd.detectChanges();
    console.log(this.expandedElement);
    
    console.log('toggle');
    
  }
}