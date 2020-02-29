import { Component, OnInit } from '@angular/core';
import { ToggleMenuService} from './../../service/toggle-menu.service'
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isMenuOpen: Boolean = true;
  constructor(private toggleService :ToggleMenuService) { }

  ngOnInit() {
    this.toggleService.isMenuOpenObservable.subscribe((val)=>{
      this.isMenuOpen = val;
    });
  }

}
