import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../service/customer.service';

@Component({
  selector: 'app-manage-customer',
  templateUrl: './manage-customer.component.html',
  styleUrls: ['./manage-customer.component.scss']
})
export class ManageCustomerComponent implements OnInit {
  supplier:any={};
  
  constructor(private customerService : CustomerService) { }
  
  ngOnInit() {
  }
  onSaveOrUpdate(){
    
    console.log(this.supplier);
    this.customerService.saveOrUpdateSupplier(this.supplier).subscribe((data)=>{
      console.log('success');
      
    },(error)=>{
      console.log(error);
      
    })
        
  }
}
