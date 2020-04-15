import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appMaxValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: MaxValidatorDirective,
    multi: true
  }]
})
export class MaxValidatorDirective implements Validator{
  @Input('appMaxValidator') max:number;
  constructor() { }
  validate(control: AbstractControl): { [key: string]: any } | null {
    if(control.value){
      return (control.value > this.max ) ? { 'max': true } : null;
    }
    return null;
  }

}
