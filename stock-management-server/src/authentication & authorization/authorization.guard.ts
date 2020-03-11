
import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  
    constructor(@Inject('AuthenticationService') private readonly authService : AuthenticationService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

       const request = context.switchToHttp().getRequest();
       console.log(request); 
    return true;
  }
}