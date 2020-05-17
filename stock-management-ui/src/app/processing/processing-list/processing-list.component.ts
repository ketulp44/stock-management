import { Component, OnInit, ViewChild, QueryList, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { ProcessingService } from '../service/processing.service';
import { MatTableDataSource, MatSort, MatPaginator, MatTable, MatDialog } from '@angular/material';
import { LoaderService } from 'src/app/common/service/loader.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AddToProcessedComponent } from '../add-to-processed/add-to-processed.component';
import { Router } from '@angular/router';

export interface ProcessingStock{
  id:number,
  commodity:string,
  subCommodity:string,
  weight:number,
  supplierList:SupplierWiseStock [] | MatTableDataSource<SupplierWiseStock>
}
export interface SupplierWiseStock{
  supplierId:number,
  supplierName:string,
  weight:number
}

@Component({
  selector: 'app-processing-list',
  templateUrl: './processing-list.component.html',
  styleUrls: ['./processing-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ProcessingListComponent implements OnInit {
  dataSource: MatTableDataSource<ProcessingStock>;
  displayedColumns: string[] = [ 'CommodityName', 'SubCommodityName','Weight','Actions'];
  innerDisplayedColumns:string[]=['id','Name','Weight'];
  @ViewChildren('innerTables') innerTables: QueryList<MatTable<SupplierWiseStock>>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  expandedElement: ProcessingStock | null;

  constructor(
    private processingService:ProcessingService,
    public loaderService:LoaderService,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private router: Router
    ) {

  }

  ngOnInit() {
  this.getStockInProcessing();
  }

  getStockInProcessing(){
    this.loaderService.showLoader();
    this.processingService.getStockInprocessing().subscribe((data:any)=>{
      data = data.map((x:any)=>{
        x.supplierList = new MatTableDataSource(x.supplierList);
        return x;
      })
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loaderService.hideLoader();

    },(err)=>{
      this.loaderService.hideLoader();
    })
  }

  toggleRow(element: ProcessingStock) {
    element.supplierList && (element.supplierList as MatTableDataSource<SupplierWiseStock>).data.length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;
    this.cd.detectChanges();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onClickMarkAsProcessed(id){
    let dialogRef = this.dialog.open(AddToProcessedComponent, {
      height: 'auto',
      width: '80%',
      maxHeight:'80%',
      data: {
        dataKey: id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.router.navigateByUrl('dashboard/currentstocks/processed');
      }else{
        this.getStockInProcessing();
      }
    });
  }
}
