import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { LoaderService } from 'src/app/common/service/loader.service';
import { ToastrService } from 'ngx-toastr';
import { CurrentStockService } from '../service/current-stock.service';
import { CommonUtilService } from 'src/app/common/service/common-util/common-util.service';
export interface CurrentStock {
  commodity: { id: number; name: string };
  subCommodity: { id: number; name: string };
  quantity: number;
  quality: string;
  incomingDateTime: Date;
}
@Component({
  selector: 'app-current-stock-list',
  templateUrl: './current-stock-list.component.html',
  styleUrls: ['./current-stock-list.component.scss']
})
export class CurrentStockListComponent implements OnInit {
  displayProgressSpinner: boolean = false;
  displayedColumns: string[] = ['id', 'CommodityName', 'SubCommodityName', 'QualityType','Quantity','IncomingDate', 'color'];
  dataSource: MatTableDataSource<CurrentStock>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private commonService: CommonUtilService,
    private currentStockService: CurrentStockService,
    private toastr: ToastrService,
    public loaderService:LoaderService
  ) { }

  ngOnInit() {
    this.getCurrentStock();
  }
  getCurrentStock(){
    this.loaderService.showLoader();
    this.currentStockService.getAllCurrentStock().subscribe((data:any) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(data);
      this.loaderService.hideLoader();
    },(err)=>{
      this.loaderService.hideLoader();
    });
  }
}
