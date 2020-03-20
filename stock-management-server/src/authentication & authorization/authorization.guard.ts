import { Injectable, CanActivate, ExecutionContext, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class AuthorizationGuard implements CanActivate {

  constructor(@Inject('AuthenticationService') private readonly authService: AuthenticationService) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    try {
      const request = context.switchToHttp().getRequest();
      let token = String(request.headers.authorization);

      if (token.startsWith('Bearer ')) {
        token = token.replace('Bearer ', '');
        const result = this.authService.verifyJwtToken(token);
        if (result.status) {
          return true;
        } else {
          throw new HttpException('Unauthorized Access', HttpStatus.UNAUTHORIZED);
        }
      } else {
        throw new HttpException('Unauthorized Access', HttpStatus.UNAUTHORIZED);
      }
    } catch (err) {
      if (err.status == HttpStatus.UNAUTHORIZED) {
        throw new HttpException(err.message, err.status);
      }
      throw new HttpException('there are some error in the system . please try again later.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}