import { InwardService } from './../service/inward.service';
import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { SearchPipe } from 'src/app/common/pipes/search.pipe';
import { CommonUtilService } from 'src/app/common/service/common-util/common-util.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/common/service/loader.service';


@Component({
  selector: 'app-inward-form',
  templateUrl: './inward-form.component.html',
  styleUrls: ['./inward-form.component.scss']
})
export class InwardFormComponent implements OnInit {

  suppliers: any[] = [];
  selectedSupplier = { id: 1, name: 'ketul' };
  inwardStock: any = {};
  searchSupplier = '';
  filteredSuppliers = [];
  filteredCommodties: any[] = [];
  commodities: any[] = [];
  searchCommodity = '';
  selectedCommodity: any;
  subCommodities: any;
  filteredSubCommodities: any[] = [];
  selectedSubCommodity: any;
  searchSubCommodity = '';
  intputStockTypes: any[] = [];
  qualityTypes: any[] = [];
  Units = ['kg', 'gram', 'quintal', 'ton'];
  maxDate: Date;
  title:string='';
  constructor(
    private searchPipe: SearchPipe,
    private commonService: CommonUtilService,
    private inwardStockService: InwardService,
    public dialogRef: MatDialogRef<InwardFormComponent>,
    private toastr: ToastrService,
    public loaderService: LoaderService,
    private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public inwardStockId: any
  ) { }

  ngOnInit() {
    if (this.inwardStockId.dataKey) {
      this.title = 'Update Inward Stock';
      this.getStockDetail(this.inwardStockId.dataKey);
    }
    else{
      this.title = 'Add Inward Stock';
    }
    this.getSuppliers();
    this.getCommoidities();
    this.getInputStockStates();
    this.getQualityTypes();
    this.setMaxDate();
  }
  getStockDetail(id) {
    this.loaderService.showLoader();
    this.inwardStockService.getInwardStockById(id).subscribe((data:any) => {
      this.inwardStock = data;
      this.getSubCommodities(data.CommodityId);
      this.loaderService.hideLoader();
    }, (err) => {
      this.loaderService.hideLoader();
    })
  }
  setMaxDate() {
    let today = new Date();
    this.maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate())

  }
  getSuppliers() {
    this.commonService.getSuppliers().subscribe((data)=>{
      this.suppliers = data;
      this.filteredSuppliers = this.suppliers;
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
      console.log(this.inwardStock.SubCommodityId);

      this.cd.detectChanges();

    });
  }
  getInputStockStates() {
    this.commonService.getInputStockType().subscribe((data) => {
      this.intputStockTypes = data;
    })
  }
  getQualityTypes() {
    this.commonService.getQualityTypes().subscribe((data) => {
      this.qualityTypes = data;
    });
  }
  onChangeCommodity(event) {
    this.getSubCommodities(event);
  }
  onClickSave() {
    this.loaderService.showLoader();
    this.inwardStockService.saveInwardStocks(this.inwardStock).subscribe((data) => {
      this.toastr.success('Stock added sucessfully', 'Success');
      this.dialogRef.close('success');
      this.loaderService.hideLoader();
    }, (err) => {
      this.loaderService.hideLoader();
      this.toastr.error(err, 'Error');
    }
    );
  }
  onCilckCancel() {
    this.dialogRef.close();
  }

  commodityFilter(event) {
    this.filteredCommodties = this.searchPipe.transform(this.commodities, this.searchCommodity);
  }
  applyFilter(event) {
    this.filteredSuppliers = this.searchPipe.transform(this.suppliers, this.searchSupplier);
  }
  subCommodityFilter(event) {
    this.filteredSubCommodities = this.searchPipe.transform(this.suppliers, this.searchSubCommodity);
  }

}
