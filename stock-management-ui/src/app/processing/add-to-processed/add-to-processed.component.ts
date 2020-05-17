import { Component, OnInit, Inject } from '@angular/core';
import { SearchPipe } from 'src/app/common/pipes/search.pipe';
import { CommonUtilService } from 'src/app/common/service/common-util/common-util.service';
import { InwardService } from 'src/app/inward/service/inward.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/common/service/loader.service';
import { ProcessingService } from '../service/processing.service';

@Component({
  selector: 'app-add-to-processed',
  templateUrl: './add-to-processed.component.html',
  styleUrls: ['./add-to-processed.component.scss']
})
export class AddToProcessedComponent implements OnInit {
  detail:any={};
  qualityTypes:any[] =[];
  qualityWiseWeights:any[]=[];
  selectedQuality : any = {};
  remainingWeight : number = 0;
  estimatedPrice:number = 0;
  constructor(private searchPipe: SearchPipe,
    private commonService: CommonUtilService,
    private processingService: ProcessingService,
    public dialogRef: MatDialogRef<AddToProcessedComponent>,
    private toastr: ToastrService,
    public loaderService:LoaderService,
    @Inject(MAT_DIALOG_DATA) public details: any) { }

  ngOnInit() {
    if(this.details.dataKey){
      this.detail = this.details.dataKey;
      this.remainingWeight = this.detail.weight;
      this.getQualityTypes();
    }
  }
  onCilckCancel(){
    this.dialogRef.close();
  }
  onClickSave(){
    this.detail.qualityWiseWeight = this.qualityWiseWeights;
    let obj:any = {};
    Object.assign(obj,this.detail);
    delete obj.supplierList;
    this.loaderService.showLoader();
    this.processingService.markStockAsProcessed(obj).subscribe((data)=>{
      this.dialogRef.close(this.detail);
      this.toastr.success('Stock successfully added to processed', 'Success');
    },
    (err)=>{
      console.log(err);

      this.loaderService.hideLoader();
      this.toastr.error(err,'Error')
    });



  }
  onClickAddQuality(){
    this.qualityWiseWeights.push(this.selectedQuality);
    this.removeFromRemaingWeight(this.selectedQuality.weight)
    this.selectedQuality = {};
    this.setQualityTypes();
    this.calculatePerKgPrice();
  }
  onClickRemoveQuality(quality){
    let index:number = this.findIndex(this.qualityWiseWeights,'qualityType',quality.qualityType);

    if(index >= 0){
      this.addToRemainingWeight(this.qualityWiseWeights[index].weight);
      this.qualityWiseWeights.splice(index,1);
      this.setQualityTypes();
      this.calculatePerKgPrice();
    }

  }
  findIndex(list:any[],field:string,val:any):number{
    return list.findIndex((value)=>{
      return value[field]==val;
    })
  }
  setQualityTypes(){
    this.commonService.getQualityTypes().subscribe((data) => {
      this.qualityTypes = data.filter((val)=>{
        return val.id != 1 && this.findIndex(this.qualityWiseWeights,'qualityType',val.value)<0;
      });
    });
  }
  getQualityTypes() {
    this.commonService.getQualityTypes().subscribe((data) => {
      this.qualityTypes = data.filter((val)=>{
        return val.id != 1;
      });
    });
  }
  addToRemainingWeight(weight:number){
    this.remainingWeight +=weight;
  }
  removeFromRemaingWeight(weight:number){
    this.remainingWeight-=weight;
  }
  calculatePerKgPrice(){
    if(this.remainingWeight <this.detail.wastageQuantity ){
      return;
    }
    let netQty = this.detail.weight - this.detail.wastageQuantity;
    let otherQauPrice= 0;
    if(this.qualityWiseWeights.length>0){
      for(let item of this.qualityWiseWeights){
        otherQauPrice += item.price * item.weight;
        netQty -= item.weight;
      }
    }
    this.estimatedPrice = ((this.detail.avgPrice*this.detail.weight) - otherQauPrice)/netQty;
  }
}
