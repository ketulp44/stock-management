import { Component, OnInit, ViewChild } from '@angular/core';
import { CurrentStockService } from '../service/current-stock.service';
import { Timestamp } from 'rxjs';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/common/service/loader.service';
import { CommonUtilService } from 'src/app/common/service/common-util/common-util.service';
export interface CuurentProcessedStock {
  commodity: { id: number; name: string };
  subCommodity: { id: number; name: string };
  quantity: number;
  quality: string;
  incomingDateTime: Date;
}

@Component({
  selector: 'app-processed-current-stock-list',
  templateUrl: './processed-current-stock-list.component.html',
  styleUrls: ['./processed-current-stock-list.component.scss']
})
export class ProcessedCurrentStockListComponent implements OnInit {
  displayProgressSpinner: boolean = false;
  displayedColumns: string[] = ['id', 'CommodityName', 'SubCommodityName', 'QualityType','Quantity','IncomingDate', 'color'];
  dataSource: MatTableDataSource<CuurentProcessedStock>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  selectedSubCommodity:number=null;
  selectedCommodity:number=null;
  searchCommodity = '';
  commodities: any[] = [];
  filteredCommodties: any[] = [];
  subCommodities: any;
  searchSubCommodity = '';
  filteredSubCommodities: any[] = [];

  constructor(
    private commonService: CommonUtilService,
    private currentStockService: CurrentStockService,
    private toastr: ToastrService,
    public loaderService:LoaderService
    ) { }

  ngOnInit() {
    this.getCommoidities();
    this.getCurrentStock();
  }
  getCurrentStock(){
    this.loaderService.showLoader();
    this.currentStockService.getProcessedCurrentStock(this.selectedCommodity, this.selectedSubCommodity).subscribe((data:any) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(data);
      this.loaderService.hideLoader();
    },(err)=>{
      this.loaderService.hideLoader();
    });
  }
  getCommoidities() {
    this.commonService.getCommodities().subscribe((data) => {
      this.commodities = data;
      this.filteredCommodties = this.commodities;
    });
  }
  getSubCommodities(id) {
    this.commonService.getSubCommodities(id).subscribe((data) => {
      this.subCommodities = data;
      this.filteredSubCommodities = this.subCommodities;
    });
  }
  onChangeCommodity(event) {
    this.getSubCommodities(event);
    this.selectedSubCommodity = null;
    this.getCurrentStock();
    // this.getStock();
  }
  onChangeSubCommodity(event) {
    this.getCurrentStock();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
