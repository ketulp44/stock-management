import { Customer } from './../entities/customer.entity';
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Get('all')
    public async getCustomers() {
        return await this.customerService.getCustomers();
    }

    @Get(':id')
    public async getCustomerById(@Param('id') customerId: number) {
        return await this.customerService.getCustomerById(customerId);
    }


    @Post()
    public async saveCustomer(@Body() customer: Customer) {
        return await this.customerService.Save(customer);
    }



}
