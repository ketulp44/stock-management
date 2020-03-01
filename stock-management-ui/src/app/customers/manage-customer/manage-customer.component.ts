import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-customer',
  templateUrl: './manage-customer.component.html',
  styleUrls: ['./manage-customer.component.scss']
})
export class ManageCustomerComponent implements OnInit {
  supplier:any={};
  constructor() { }
  
  ngOnInit() {
  }
  onSaveOrUpdate(){
    
    console.log(this.supplier);
    
        
  }
}
