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
    return this.http.post(`${BASE_URL}commoditys`, commodity);
  }

  getCommoditys(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}commodity/all`);
  }

  getCommodity(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}commodity/${id}`);
  }
  
  deleteCommodity(id: number): Observable<any> {
    return this.http.get<any>(`${BASE_URL}commoditys/deleteById/${id}`);
  }
}
