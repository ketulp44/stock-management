import { CookieService } from './../common/service/cookie/cookie.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  constructor(private readonly cookieService: CookieService,
    private readonly loginService: LoginService,
    private readonly toastr: ToastrService,
    private router: Router, ) { }

  ngOnInit() {
  }
  onClickLogin() {
    const userDetails = {
      username: this.username,
      password: this.password
    };
    this.loginService.Login(userDetails).subscribe((data: any) => {
      this.cookieService.setCookie('Token', String(data.Token));
      this.router.navigate(['/dashboard']);
    }, error => {
      console.log(error.error.error);
      this.toastr.error(error.error.error);
    });

  }

}
