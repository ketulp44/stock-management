import { AuthorizationGuard } from './../authentication & authorization/authorization.guard';
import { SuppliersService } from './suppliers.service';
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { SupplierDTO } from '../dtos/supplier.dto';

//@UseGuards(AuthorizationGuard)
@Controller('suppliers')
export class SuppliersController {

    constructor(private readonly suppliersService : SuppliersService){}

    @Get()
    public async getSuppliers(){
        return await this.suppliersService.getSuppliers();
    } 

    @Post()
    public async createSupplier(@Body() supplier:SupplierDTO)
    {
        return await this.suppliersService.createNewSupplier(supplier);
    }

}
