import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

const BASE_URL: string = environment.BASE_URL;
@Injectable({
  providedIn: 'root'
})
export class CurrentStockService {

  constructor(private http: HttpClient) { }

  getUnprocessedStock(commodityId,subCommodityId){
    return this.http.get(`${BASE_URL}current-stock/unprocessed/all/${commodityId}/${subCommodityId}`);
  }

  getProcessedCurrentStock(commodityId,subCommodityId){
    return this.http.post(`${BASE_URL}current-stock/processed/all`,{commodityId: commodityId,subCommodityId:subCommodityId});
  }

  getAllCurrentStock(){
    return this.http.get(`${BASE_URL}current-stock/all`);
  }

  saveToProcessingStock(details:any[]){
    return this.http.post(`${BASE_URL}current-stock/addtoprocessing`,details);
  }
}
