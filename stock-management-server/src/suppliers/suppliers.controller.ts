import { SuppliersService } from './suppliers.service';
import { Controller, Get, Post, Body } from '@nestjs/common';
import { SupplierDTO } from 'src/dtos/supplier.dto';

@Controller('suppliers')
export class SuppliersController {

    constructor(private readonly suppliersService : SuppliersService){}

    @Get()
    public async getSuppliers(){
        console.log(process.env.TYPEORM_CONNECTION);
        return await this.suppliersService.getSuppliers();
    } 

    @Post()
    public async createSupplier(@Body() supplier:SupplierDTO)
    {
        return await this.suppliersService.createNewSupplier(supplier);
    }

}
