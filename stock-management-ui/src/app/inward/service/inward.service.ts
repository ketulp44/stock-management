import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASE_URL: string = environment.BASE_URL;
@Injectable({
  providedIn: 'root'
})
export class InwardService {

  constructor(private http: HttpClient) { }


  getInwardStocks() {
    return this.http.get(`${BASE_URL}inward-stock/all`);
  }

  getInwardStockById(id: number) {
    return this.http.get(`${BASE_URL}inward-stock/${id}`);
  }

  saveInwardStocks(inwardStock: any) {
    return this.http.post(`${BASE_URL}inward-stock`, inwardStock);
  }

}
