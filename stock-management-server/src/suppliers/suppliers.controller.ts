import { AuthorizationGuard } from './../authentication & authorization/authorization.guard';
import { SuppliersService } from './suppliers.service';
import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { SupplierDTO } from '../dtos/supplier.dto';

//@UseGuards(AuthorizationGuard)
@Controller('suppliers')
export class SuppliersController {

    constructor(private readonly suppliersService : SuppliersService){}

    @Get('findById/:id')
    public async getSupplier(@Param('id')id:number){
        console.log(id)
        return await this.suppliersService.getSupplier(id);
    } 
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
