import { Component, OnInit } from '@angular/core';
import { CommodityService } from '../services/commodity.service';
import { MatDialogRef } from '@angular/material/dialog';
import { LoaderService } from 'src/app/common/service/loader.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-add-sub-commodity',
  templateUrl: './add-sub-commodity.component.html',
  styleUrls: ['./add-sub-commodity.component.scss']
})
export class AddSubCommodityComponent implements OnInit {
  subCommodity: any = {};
  displayProgressSpinner: boolean = false;
  constructor(private commodityService: CommodityService,
    public dialogRef: MatDialogRef<AddSubCommodityComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public subCommodityId: any
   ) { }

  ngOnInit() {
  
    if(this.subCommodityId.dataKey) {
      this.commodityService.getSubCommodity(this.subCommodityId.dataKey).subscribe((data) => {
      this.subCommodity = data;
      }, (error) => {
        this.toastr.error(error,'Error')
      })
    }
  }

  onSaveOrUpdate() {
    this.showLoader()
    this.commodityService.saveOrUpdateSubCommodity(this.subCommodity).subscribe((data) => {
      this.hideLoader();
      this.dialogRef.close('success');
      this.toastr.success('SubCommodity added sucessfully', 'Success');
    }, (error) => {
      this.hideLoader();
      this.toastr.error(error,'Error')
    })
  }
  closeDialog() {
    this.dialogRef.close('Pizza!');
  }
  showLoader() {
    this.displayProgressSpinner = true;
  }
  hideLoader() {
    this.displayProgressSpinner = false;
  }
}
