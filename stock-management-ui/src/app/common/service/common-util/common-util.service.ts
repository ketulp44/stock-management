import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { INPUT_STOCK_STATES} from './../../constants/input-stock-type.constant';
import { QUALITY_TYPES} from './../../constants/quality-type.constant';

const BASE_URL: string = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class CommonUtilService {

  constructor(private http: HttpClient) { }

  getCommodities(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}commodity/all`);
  }
  getSubCommodities(id): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}sub-commodity/commodity-wise/${id}`);
  }
  getInputStockType(): Observable<any[]> {
    return of(INPUT_STOCK_STATES);
  }
  getQualityTypes(): Observable<any[]>{
    return of(QUALITY_TYPES);
  }
  getCustomers():Observable<any []>{
    return this.http.get<any []>(`${BASE_URL}customer/all`);
  }
  getSuppliers(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}suppliers/all`);
 }
}
