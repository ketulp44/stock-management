import { AuthenticationModule } from './../authentication & authorization/authentication.module';
import { User } from './../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
    AuthenticationModule],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule { }
