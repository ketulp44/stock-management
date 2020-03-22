import { Injectable, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleMenuService {
  
  isMenuOpenSubject: BehaviorSubject<Boolean> = new BehaviorSubject(true);
  isMenuOpenObservable:Observable<Boolean> = this.isMenuOpenSubject.asObservable();
  
  constructor() { }

  toggleMenu(){
    this.isMenuOpenSubject.next(true);
  }

}
