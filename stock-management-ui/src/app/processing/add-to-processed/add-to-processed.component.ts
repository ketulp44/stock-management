import { Component, OnInit, Inject } from '@angular/core';
import { SearchPipe } from 'src/app/common/pipes/search.pipe';
import { CommonUtilService } from 'src/app/common/service/common-util/common-util.service';
import { InwardService } from 'src/app/inward/service/inward.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/common/service/loader.service';

@Component({
  selector: 'app-add-to-processed',
  templateUrl: './add-to-processed.component.html',
  styleUrls: ['./add-to-processed.component.scss']
})
export class AddToProcessedComponent implements OnInit {
  detail:any={};
  constructor(private searchPipe: SearchPipe,
    private commonService: CommonUtilService,
    private inwardStockService: InwardService,
    public dialogRef: MatDialogRef<AddToProcessedComponent>,
    private toastr: ToastrService,
    public loaderService:LoaderService,
    @Inject(MAT_DIALOG_DATA) public details: any) { }

  ngOnInit() {
    console.log(this.details.dataKey);
    if(this.details.dataKey){
      this.detail = this.details.dataKey;
    }
  }
  onCilckCancel(){
    this.dialogRef.close();
  }
  onClickSave(){
    this.dialogRef.close(this.detail);
  }
}
