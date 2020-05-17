import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/common/service/loader.service';

@Component({
  selector: 'app-add-to-processing-popup',
  templateUrl: './add-to-processing-popup.component.html',
  styleUrls: ['./add-to-processing-popup.component.scss']
})
export class AddToProcessingPopupComponent implements OnInit {

  details:any={}

  constructor(
    public dialogRef: MatDialogRef<AddToProcessingPopupComponent>,
    private toastr: ToastrService,
    public loaderService:LoaderService,
    @Inject(MAT_DIALOG_DATA) public stockDetail: any
  ) { }

  ngOnInit() {
    this.details = this.stockDetail.dataKey;
  }

  onCilckCancel(){
    this.dialogRef.close();
  }

  onClickSave(){
    this.dialogRef.close(this.details);
  }
}
