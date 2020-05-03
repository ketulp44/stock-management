import { Component, OnInit } from '@angular/core';
import { ToggleMenuService } from '../../service/toggle-menu.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isMenuOpen:Boolean= true;
  constructor(private toggleService :ToggleMenuService) { 
    
    
  }

  ngOnInit() {
    this.toggleService.isMenuOpenObservable.subscribe((val)=>{
      this.isMenuOpen = val;
    });
    this.toggleService.toggleMenu();
  }

}
