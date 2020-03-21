import { Customer } from './../entities/customer.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {

    constructor(@InjectRepository(Customer)
    private readonly CustomerRepository: Repository<Customer>, ) {

    }

    public async getCustomers() {
        return await this.CustomerRepository.find({ where: [{ IsActive: 1 }] });
    }

    public async getCustomerById(id: number) {
        return await this.CustomerRepository.findOne(id);
    }

    public async Save(customer: Customer) {
        let result;
        if (Number(customer.CustomerID) > 0) {
            result = await this.UpdateCustomer(customer);
        } else {
            result = await this.createNewCustomer(customer);
        }
        return result;
    }

    public async createNewCustomer(customer: Customer) {
        customer.CreatedDateTime = new Date();
        customer.UpdateDateTime = new Date();
        return await this.CustomerRepository.insert(customer);
    }

    public async UpdateCustomer(customer: Customer) {
        customer.UpdateDateTime = new Date();
        return await this.CustomerRepository.update(customer.CustomerID, customer);
    }


}
