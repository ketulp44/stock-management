import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const BASE_URL: string = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class CommodityService {

  constructor(private http: HttpClient) { }

  saveOrUpdateCommodity(commodity: any): Observable<any> {
    return this.http.post(`${BASE_URL}commodity`, commodity);
  }
  saveOrUpdateSubCommodity(id: number): Observable<any> {
    var subCommodity = { 
      SubCommodityID:id, 
      IsActive:0 
   };
    return this.http.post(`${BASE_URL}sub-commodity`, subCommodity);
  }

  getCommoditys(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}commodity/all`);
  }

  getCommodity(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}commodity/${id}`);
  }
  getSubCommodity(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}sub-commodity/${id}`);
  }
  getSubcommodity(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}sub-commodity/commodity-wise/${id}`);
  }
  getCommodityWithSubCommodities(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}commodity/with-sub-commodities`);
  }
  
  deleteCommodity(id: number): Observable<any> {
    var commodity = { 
      CommodityID:id, 
      IsActive:0 
   };
    return this.http.post<any>(`${BASE_URL}commodity`,commodity);
  }
}
