import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() { }
  getCookie(cookieName: string) {
    cookieName = cookieName + '=';
    const cookies = document.cookie.split('; ');
    cookies.forEach(cookie => {
      const cookieDetails = cookie.split('=');
      if (cookieDetails[0] === cookieName) {
        return cookieDetails[1];
      }
    });
    return '';
  }

  setCookie(cookieName: string, cookieValue: string) {
    document.cookie = cookieName + '=' + cookieValue + ';path=/;';
  }
  setCookieWithExpireTime(cookieName: string, cookieValue: string, expireDays: number) {
    const d = new Date();
    d.setTime(d.getTime() + (expireDays * 24 * 60 * 60 * 1000));
    const expiresTime = 'expires=' + d.toUTCString();
    document.cookie = cookieName + '=' + cookieValue + ';' + expiresTime + ';path=/';
  }
  clearCookies(cookieName: string) {
    this.setCookie(cookieName, '');
  }
}
