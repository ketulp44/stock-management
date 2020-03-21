import { Suppliers } from './../entities/suppliers.entity';
import { AuthorizationGuard } from './../authentication & authorization/authorization.guard';
import { SuppliersService } from './suppliers.service';
import { Controller, Get, Post, Body, UseGuards, Param, Delete, Put } from '@nestjs/common';
import { SupplierDTO } from '../dtos/supplier.dto';

//@UseGuards(AuthorizationGuard)
@Controller('suppliers')
export class SuppliersController {

    constructor(private readonly suppliersService: SuppliersService) { }

    @Get('all')
    public async getSuppliers() {
        return await this.suppliersService.getSuppliers();
    }

    @Get(':id')
    public async getSuppliersById(@Param('id') supplierId: number) {
        return await this.suppliersService.getSuppliersById(supplierId);
    }


    @Post()
    public async createSupplier(@Body() supplier: Suppliers) {
        return await this.suppliersService.Save(supplier);
    }

}
