import { Component, OnInit } from '@angular/core';
import { CommonUtilService } from 'src/app/common/service/common-util/common-util.service';

@Component({
  selector: 'app-add-to-processing-form',
  templateUrl: './add-to-processing-form.component.html',
  styleUrls: ['./add-to-processing-form.component.scss']
})
export class AddToProcessingFormComponent implements OnInit {
  commodities: any[] = [];
  processingDetail:any={};
  searchCommodity = '';
  selectedCommodity: any;
  filteredCommodties: any[] = [];
  subCommodities: any;
  searchSubCommodity = '';
  filteredSubCommodities: any[] = [];
  constructor(private commonService: CommonUtilService) { }

  ngOnInit() {
    this.getCommoidities();
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
  onChangeCommodity(event) {
    this.getSubCommodities(event);
  }

}
