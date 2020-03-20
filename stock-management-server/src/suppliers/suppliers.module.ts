import { AuthenticationModule } from './../authentication & authorization/authentication.module';
import { AuthenticationService } from './../authentication & authorization/authentication.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SuppliersController } from './suppliers.controller';
import { SuppliersService } from './suppliers.service';
import { Suppliers } from '../entities/suppliers.entity';

@Module({
  imports :[TypeOrmModule.forFeature([Suppliers]) , AuthenticationModule],
  controllers: [SuppliersController],
  providers: [SuppliersService]
})
export class SuppliersModule {}
