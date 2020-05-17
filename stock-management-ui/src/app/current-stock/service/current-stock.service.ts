import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

const BASE_URL: string = environment.BASE_URL;
@Injectable({
  providedIn: 'root'
})
export class CurrentStockService {

  stock:any[]=[
    {
      id:1,
      supplierId:1,
      supplierName: 'ketul',
      quantity: 10,
      commodity:'JIRU',
      subCommodity:'Aus'
    },
    {
      id:2,
      supplierId:2,
      supplierName: 'harsh',
      quantity: 10,
      commodity:'JIRU',
      subCommodity:'Aus'
    },
    {
      id:3,
      suplierId:3,
      supplierName: 'kadam',
      quantity: 15,
      commodity:'JIRU',
      subCommodity:'Aus'
    },
    {
      id:4,
      supplierId:4,
      supplierName: 'Narendra',
      quantity: 10,
      commodity:'JIRU',
      subCommodity:'Aus'
    },
    {
      id:5,
      supplierId:5,
      supplierName: 'Parth',
      quantity: 20,
      commodity:'JIRU',
      subCommodity:'Aus'
    },
    {
      id:6,
      supplierId:6,
      supplierName: 'dhruv',
      quantity: 10,
      commodity:'JIRU',
      subCommodity:'Aus'
    },
    {
      id:7,
      supplierId:7,
      supplierName: 'Axay',
      quantity: 10,
      commodity:'JIRU',
      subCommodity:'Aus'
    },
    {
      id:8,
      supplierId:1,
      supplierName: 'Nihar',
      quantity: 10,
      commodity:'JIRU',
      subCommodity:'Aus'
    }
  ];

  constructor(private http: HttpClient) { }

  getUnprocessedStock(commodityId,subCommodityId){
    return this.http.get(`${BASE_URL}current-stock/unprocessed/all/${commodityId}/${subCommodityId}`);
  }

  getProcessedCurrentStock(commodityId,subCommodityId){
    return this.http.post(`${BASE_URL}current-stock/processed/all`,{commodityId: commodityId,subCommodityId:subCommodityId});
  }

  saveToProcessingStock(details:any[]){
    return this.http.post(`${BASE_URL}current-stock/addtoprocessing`,details);
  }
}
