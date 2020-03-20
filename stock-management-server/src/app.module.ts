import { Suppliers } from './entities/suppliers.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SuppliersModule } from './suppliers/suppliers.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { AuthenticationModule } from './authentication & authorization/authentication.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    SuppliersModule,
  AuthenticationModule,
  UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
