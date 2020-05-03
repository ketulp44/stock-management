import { User } from './../entities/user.entity';
import { LoginDTO } from './../dtos/login.dto';
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isNullOrUndefined } from 'util';

@Injectable()
export class AuthenticationService {
    constructor(@InjectRepository(User)
    private readonly UserRepository: Repository<User>) {}
    
    public async Login(userInfo: LoginDTO) {
        try {
         const user:User = await this.UserRepository.findOne({where : {email:userInfo.username , password:userInfo.password}});    
         if(!isNullOrUndefined(user))
         {
          if(user.IsEnabled == 1)
         {
              const token = this.createJwtToken({email : user.email , name : user.username });
              return {Token : token}; 

         } else {
            throw new HttpException('An Administrator blocked you.please contact Administrator for more information.',HttpStatus.UNAUTHORIZED);
         } 
        } else {
            throw new HttpException('Invalid Credential. please try again.',HttpStatus.UNAUTHORIZED);
        }
    } catch(err) {
        if(err.status == HttpStatus.UNAUTHORIZED) {
            throw new HttpException(err.message,err.status);
        }
        throw new HttpException('There are some error in server please try again after some time or contact Administrator.',HttpStatus.INTERNAL_SERVER_ERROR);
    }

    }

    public createJwtToken(payload):string {
        const signInOption:jwt.SignOptions = {
                  algorithm : 'HS512',
                  expiresIn : String(process.env.EXPIRE_TIME)
        }
        const token = jwt.sign(payload,String(process.env.SECRET_KEY),signInOption);
        return token;
    }

    public decodeJwtToken(token:string) {
        var payload = jwt.decode(token);
        return payload;
    }

    public verifyJwtToken(token:string) {
        try {
            var decoded = jwt.verify(token,String(process.env.SECRET_KEY));
            return {
                payload : decoded,
                status : true,
                error : null
            }
          } catch(err) {
            return {
                payload : null,
                status : false,
                error : err
            }
          }
    }
}