import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
const BASE_URL: string = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class ProcessingService {

  processingStock = [
    {
      id: 1,
      commodity:'Jiru',
      subCommodity:'Aus',
      weight: 100,
      supplierList : [
        {
          supplierId: 1,
          supplierName:'ketul',
          weight:50
        },
        {
          supplierId: 2,
          supplierName:'harsh',
          weight:50
        }
      ]
    },
    {
      id: 1,
      commodity:'Variyali',
      subCommodity:'Mehsani',
      weight: 100,
      supplierList : [
        {
          supplierId: 3,
          supplierName:'kadam',
          weight:50
        },
        {
          supplierId: 4,
          supplierName:'Narendra',
          weight:50
        }
      ]
    }
  ]

  constructor(private http: HttpClient) { }


  getStockInprocessing(){
    return of(this.processingStock);
  }
}
