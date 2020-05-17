import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonUtilService } from 'src/app/common/service/common-util/common-util.service';
import { CurrentStockService } from '../service/current-stock.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { AddToProcessingPopupComponent } from '../add-to-processing-popup/add-to-processing-popup.component';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/common/service/loader.service';
import { Router } from '@angular/router';
export interface Stock{
    id:number,
    supplierId:number,
    supplierName:String,
    commodity:string,
    subCommodity:string,
    quantity:number,
}
@Component({
  selector: 'app-add-to-processing-form',
  templateUrl: './add-to-processing-form.component.html',
  styleUrls: ['./add-to-processing-form.component.scss']
})
export class AddToProcessingFormComponent implements OnInit {
  commodities: any[] = [];
  processingDetail:any={};
  searchCommodity = '';
  selectedCommodity: any;
  filteredCommodties: any[] = [];
  subCommodities: any;
  searchSubCommodity = '';
  filteredSubCommodities: any[] = [];
  stock:any[]=[];
  processingStock:MatTableDataSource<Stock>;
  dataSource: MatTableDataSource<Stock>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('prcessingPaginator', { static: true }) processingPaginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatSort, { static: true }) processingSort: MatSort;
  displayedColumns: string[] = ['id', 'CommodityName', 'SubCommodityName','Quantity','SupplierName','actions'];
  constructor(
    private commonService: CommonUtilService,
    private currentStockService:CurrentStockService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router,
    public loaderService: LoaderService,
    ) { }

  ngOnInit() {
    this.getCommoidities();
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
    this.processingDetail.SubCommodityId = null;
    // this.getStock();
  }

  onChangeSubCommodity(event) {
    this.getStock();
  }

  getStock(){
    this.loaderService.showLoader();
    this.currentStockService.getUnprocessedStock(this.processingDetail.CommodityId,this.processingDetail.SubCommodityId).subscribe((data:any[])=>{
      this.stock = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.processingStock = new MatTableDataSource([]);
      this.processingStock.paginator = this.processingPaginator;
      this.processingStock.sort = this.processingSort;
      this.loaderService.hideLoader();
    },err=>{
      this.loaderService.hideLoader();
      this.toastr.error('err','Error');
    })
  }

  onClickRemoveStock(stock,index){
      let i = this.findIndex(this.dataSource.data,stock.id);
      if(i>=0){
        this.dataSource.data[i].quantity+=stock.quantity;
      }else{
        this.dataSource.data.push(stock);
      }
      this.processingStock.data.splice(index,1);
      this.processingStock._updateChangeSubscription();
      this.dataSource._updateChangeSubscription();
  }

  onClickAddStock(stock,index){
    let dialogRef = this.dialog.open(AddToProcessingPopupComponent, {
      height: 'auto',
      width: '80%',
      maxWidth: '500px',
      maxHeight:'80%',
      data: {
        dataKey: stock
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.addToProcessingList(result);
      }
    });
  }

  addToProcessingList(detail) {
    let index = this.findIndex(this.dataSource.data, detail.id);
    if (index >= 0) {
        let proIndex = this.findIndex(this.processingStock.data,detail.id);
        if(proIndex>=0){
          this.processingStock.data[proIndex].quantity+=detail.quantityAdded;
        }else{
          let obj = Object.assign({},this.dataSource.data[index]);
          obj.quantity=detail.quantityAdded;
          this.processingStock.data.push(obj);
        }

        if(this.dataSource.data[index].quantity == detail.quantityAdded){
          this.dataSource.data.splice(index, 1);
        }
        else{
          this.dataSource.data[index].quantity -= detail.quantityAdded;
        }
    }
    delete detail.quantityAdded;
    this.processingStock._updateChangeSubscription();
    this.dataSource._updateChangeSubscription();
  }

  findIndex(list: any[],id){
    return list.findIndex((value)=>{
      return value.id == id;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  OnCliCkAddStockToProcessing(){
    this.loaderService.showLoader();
    this.currentStockService.saveToProcessingStock(this.processingStock.data).subscribe((data)=>{
      this.loaderService.hideLoader();
      this.toastr.success('Successfully Added To Processing !','Success')
          this.router.navigateByUrl('dashboard/processing');
    },(err)=>{
      this.loaderService.hideLoader();
      this.toastr.error(err,'Error');
    });
  }
}
