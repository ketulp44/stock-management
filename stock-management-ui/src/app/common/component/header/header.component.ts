import { Component, OnInit } from '@angular/core';
import { ToggleMenuService} from './../../service/toggle-menu.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isMenuOpen : Boolean = true;
  constructor(private toggleService : ToggleMenuService) { }

  ngOnInit() {
    this.toggleService.isMenuOpenObservable.subscribe((val)=> {
      this.isMenuOpen = val;
    });
  }
  
  toggleMenu(event){
    this.toggleService.toggleMenu();
  }
}
