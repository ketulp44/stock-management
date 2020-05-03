import { Suppliers } from './entities/suppliers.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SuppliersModule } from './suppliers/suppliers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationModule } from './authentication & authorization/authentication.module';
import { UsersModule } from './users/users.module';
import { CustomerModule } from './customer/customer.module';
import { CommodityModule } from './commodity/commodity.module';
import { SubCommodityModule } from './sub-commodity/sub-commodity.module';
import { InwardStockModule } from './inward-stock/inward-stock.module';
import { CurrentStockModule } from './currentstock/currentstock.module';
import { ProcessingModule } from './processing/processing.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    SuppliersModule,
    AuthenticationModule,
    UsersModule,
    CustomerModule,
    CommodityModule,
    SubCommodityModule,
    InwardStockModule,
    CurrentStockModule,
    ProcessingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
