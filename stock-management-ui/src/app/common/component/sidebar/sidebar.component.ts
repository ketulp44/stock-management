import { Component, OnInit, ViewChild } from '@angular/core';
import { ToggleMenuService} from './../../service/toggle-menu.service'
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isMenuOpen: Boolean = true;
  constructor(private toggleService :ToggleMenuService) { }
  @ViewChild('sidenav',{static:true}) sideNav;
  ngOnInit() {
    this.toggleService.isMenuOpenObservable.subscribe((val)=>{
      this.isMenuOpen = val;
      this.sideNav.toggle();
    });
  }

}
