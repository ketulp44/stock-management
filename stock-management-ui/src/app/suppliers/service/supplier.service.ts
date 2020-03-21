import { Injectable } from '@angular/core';
import { environment} from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL :string = environment.BASE_URL;
@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  
  constructor(private http: HttpClient) { }
   saveOrUpdateSupplier(supplier:any):Observable<any>{
      return this.http.post(`${BASE_URL}suppliers`,supplier);
   }
   getSuppliers():Observable<any []>{
      return this.http.get<any []>(`${BASE_URL}suppliers/all`);
   }
   getSupplier(id:number):Observable<any []>{
     console.log(id);
      return this.http.get<any []>(`${BASE_URL}suppliers/${id}`);
   }
   deleteSupplier(id:any):Observable<any>{
    var supplier = { 
      SupplierID:id, 
      IsActive:0 
   };
      return this.http.post<any>(`${BASE_URL}suppliers`,supplier);
   }
}
