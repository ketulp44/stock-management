import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/common/service/loader.service';
import { CommonUtilService } from 'src/app/common/service/common-util/common-util.service';
import { SearchPipe } from 'src/app/common/pipes/search.pipe';

@Component({
  selector: 'app-sell-form',
  templateUrl: './sell-form.component.html',
  styleUrls: ['./sell-form.component.scss']
})
export class SellFormComponent implements OnInit {
  customers:any[];
  fileterCustomers: any []=[];
  searchCustomer= '';
  soldStock:any = {};
  constructor(
    private searchPipe: SearchPipe,
    public dialogRef: MatDialogRef<SellFormComponent>,
    private toastr: ToastrService,
    private commonService: CommonUtilService,
    public loaderService: LoaderService,
    @Inject(MAT_DIALOG_DATA) public inwardStockId: any
  ) { }

  ngOnInit() {
    this.getCustomers();
    if (this.inwardStockId.dataKey) {
      // this.getStockDetail(this.inwardStockId.dataKey);

    }
  }
  onCilckCancel() {
    this.dialogRef.close();
  }
  getCustomers(){
    this.commonService.getCustomers().subscribe((data)=>{
      this.customers = data;
      console.log(this.customers);
    });
  }
  applyFilter(event) {
    this.fileterCustomers = this.searchPipe.transform(this.customers, this.searchCustomer);
  }
}
