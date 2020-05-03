import { AuthenticationController } from './authentication.controller';
import { User } from './../entities/user.entity';
import { Module, Global } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
  exports : [AuthenticationService]

})
export class AuthenticationModule {}
