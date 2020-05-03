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
   saveOrUpdateCustomer(customer:any):Observable<any>{
      return this.http.post(`${BASE_URL}customer`,customer);
   }
   getCustomers():Observable<any []>{
      return this.http.get<any []>(`${BASE_URL}customer/all`);
   }
   getCustomer(id:number):Observable<any []>{
      return this.http.get<any []>(`${BASE_URL}customer/${id}`);
   }
   deleteCustomer(id:any):Observable<any>{
    var customer = { 
      CustomerID:id, 
      IsActive:0 
   };
      return this.http.post<any>(`${BASE_URL}customer`,customer);
   }
}
