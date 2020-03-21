import { Router } from '@angular/router';
import { CookieService } from './../../service/cookie/cookie.service';
import { Component, OnInit } from '@angular/core';
import { ToggleMenuService } from './../../service/toggle-menu.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isMenuOpen: Boolean = true;
  constructor(private toggleService: ToggleMenuService,
    private readonly cookieService: CookieService,
    private router: Router) { }

  ngOnInit() {
    this.toggleService.isMenuOpenObservable.subscribe((val) => {
      this.isMenuOpen = val;
    });
  }

  toggleMenu(event) {
    this.toggleService.toggleMenu();
  }

  Logout() {
    this.cookieService.clearCookies('Token');
    this.router.navigate(['/login']);

  }
}
