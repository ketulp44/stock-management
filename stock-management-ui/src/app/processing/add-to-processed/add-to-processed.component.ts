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
  qualityTypes:any[] =[]; 
  qualityWiseWeights:any[]=[];
  selectedQuality : any = {};
  remainingWeight : number = 0;
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
      this.remainingWeight = this.detail.weight;
      this.getQualityTypes();
    }
  }
  onCilckCancel(){
    this.dialogRef.close();
  }
  onClickSave(){
    this.dialogRef.close(this.detail);
  }
  onClickAddQuality(){
    this.qualityWiseWeights.push(this.selectedQuality);
    this.removeFromRemaingWeight(this.selectedQuality.weight)
    this.selectedQuality = {};
    this.setQualityTypes();
  }
  onClickRemoveQuality(quality){
    let index:number = this.findIndex(this.qualityWiseWeights,'qualityType',quality.qualityType);
    
    if(index >= 0){
      this.addToRemainingWeight(this.qualityWiseWeights[index].weight);
      this.qualityWiseWeights.splice(index,1);
      this.setQualityTypes();
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
    
  }
}
