import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { InwardService } from '../service/inward.service';
import { InwardFormComponent } from '../inward-form/inward-form.component';
export interface CommodityDetail{
  CommodityID:number;
  CommodityName:string;
}
export interface InwardStock {
  InwardStockId: number;
  SupplierId: number;
  Commodity: CommodityDetail
  CommodityId: number;
  CommodityName: string;
  SubCommodityId: number;
  SubCommodityName: string
  ProcessType: string;
  QualityType: string;
  PackageSize: number;
  PackageUnit: string;
  NoOfBags: number;
  CustomerName: string;
  StockPrice: number;
  IncomingDate: Date;
  IsActive: number;
  StockLocation: string
}
@Component({
  selector: 'app-inward-stock-list',
  templateUrl: './inward-stock-list.component.html',
  styleUrls: ['./inward-stock-list.component.scss']
})
export class InwardStockListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'CommodityName', 'SubCommodityName','ProcessType','QualityType','StockLocation','StockPrice','IncomingDate', 'color'];
  dataSource: MatTableDataSource<InwardStock>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private dialog: MatDialog,
    private toastr: ToastrService, private inwardStockService: InwardService) {
  }
  ngOnInit() {
    console.log('init');
    
    this.getInwardStocks();
  }
  getInwardStocks(){
    console.log('get inward stocks');
    
    this.inwardStockService.getInwardStocks().subscribe((data:any)=>{
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onClickAddStock(id?){
    console.log('id ', id);
    let dialogRef = this.dialog.open(InwardFormComponent, {
      height: 'auto',
      width: '80%',
      maxHeight:'80%',
      data: {
        dataKey: id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getInwardStocks();
    });
    
  }
  onClickRemoveStock(id){
    console.log('remove', id);
    
  }
  
}
