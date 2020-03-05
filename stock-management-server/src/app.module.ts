import { Suppliers } from './entities/suppliers.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SuppliersModule } from './suppliers/suppliers.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { AuthenticationModule } from './authentication & authorization/authentication.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    SuppliersModule,
  AuthenticationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
