import { Injectable } from '@angular/core';
import { environment} from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL :string = environment.BASE_URL;
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  
  constructor(private http: HttpClient) { }
   saveOrUpdateSupplier(supplier:any):Observable<any>{
      return this.http.post(`${BASE_URL}suppliers`,supplier);
   }
   getSuppliers():Observable<any []>{
      return this.http.get<any []>(`${BASE_URL}suppliers`);
   }
   getSupplier(id:number):Observable<any []>{
      return this.http.get<any []>(`${BASE_URL}suppliers/findById/${id}`);
   }
   deleteSupplier(id:number):Observable<any>{
      return this.http.get<any>(`${BASE_URL}suppliers/deleteById/${id}`);
   }
}
