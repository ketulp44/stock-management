import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appContactValidator][ngModel]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ContactValidatorDirective,
    multi: true
  }]
})
export class ContactValidatorDirective implements Validator {
  constructor() { 
  }
  validate(control: AbstractControl): { [key: string]: any } | null {
    if(control.value){
      return (control.value<1000000000 || control.value > 9999999999) ? { 'invalidContact': true } : null;
    }
    return null;
  }

}
