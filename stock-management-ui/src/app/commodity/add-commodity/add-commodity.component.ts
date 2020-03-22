import { Component, OnInit } from '@angular/core';
import { CommodityService } from '../services/commodity.service';
import { MatDialogRef } from '@angular/material/dialog';
import { LoaderService } from 'src/app/common/service/loader.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-add-commodity',
  templateUrl: './add-commodity.component.html',
  styleUrls: ['./add-commodity.component.scss']
})
export class AddCommodityComponent implements OnInit {
  commodity: any = {};
  displayProgressSpinner: boolean = false;
  constructor(private commodityService: CommodityService,
    public dialogRef: MatDialogRef<AddCommodityComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public commodityId: any
   ) { }

  ngOnInit() {
  
    if(this.commodityId.dataKey) {
      this.commodityService.getCommodity(this.commodityId.dataKey).subscribe((data) => {
      this.commodity = data;
      }, (error) => {
        this.toastr.error(error,'Error')
      })
    }
  }

  onSaveOrUpdate() {
    this.showLoader()
    this.commodityService.saveOrUpdateCommodity(this.commodity).subscribe((data) => {
      this.hideLoader();
      this.dialogRef.close('success');
      this.toastr.success('Supplier added sucessfully', 'Success');
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
