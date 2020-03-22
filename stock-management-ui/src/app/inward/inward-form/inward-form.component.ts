import { InwardService } from './../service/inward.service';
import { Component, OnInit, Inject } from '@angular/core';
import { SearchPipe } from 'src/app/common/pipes/search.pipe';
import { CommonUtilService } from 'src/app/common/service/common-util/common-util.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inward-form',
  templateUrl: './inward-form.component.html',
  styleUrls: ['./inward-form.component.scss']
})
export class InwardFormComponent implements OnInit {

  suppliers: any[] = [{ id: 1, name: 'ketul' }, { id: 2, name: 'harsh' }, { id: 3, name: 'kadam' }, { id: 4, name: 'narendra' }, { id: 5, name: 'parth' }];
  selectedSupplier = { id: 1, name: 'ketul' };
  inwardStock: any = {}
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
  maxDate: Date;
  constructor(
    private searchPipe: SearchPipe,
    private commonService: CommonUtilService,
    private inwardStockService: InwardService,
    public dialogRef: MatDialogRef<InwardFormComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public inwardStockId: any
  ) { }

  ngOnInit() {
    this.getSuppliers();
    this.getCommoidities();
    this.getInputStockStates();
    this.getQualityTypes();
    this.setMaxDate();
  }
  setMaxDate() {
    let today = new Date();
    this.maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    console.log(this.maxDate);

  }
  getSuppliers() {
    this.filteredSuppliers = this.suppliers;
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
      console.log(this.filteredSubCommodities);
      
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
    console.log(this.inwardStock);
    
    this.inwardStockService.saveInwardStocks(this.inwardStock).subscribe((data)=>{
      console.log(data);
      
    },err=>console.log(err)
    );
  }
  onCilckCancel() {

  }
  closeDialog(){
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
