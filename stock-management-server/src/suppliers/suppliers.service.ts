import { Suppliers } from './../entities/suppliers.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupplierDTO } from '../dtos/supplier.dto';

@Injectable()
export class SuppliersService {

    constructor(@InjectRepository(Suppliers)
    private readonly SupplierRepository: Repository<Suppliers>,) {
        
    }

    public async getSuppliers() {
        return await this.SupplierRepository.find();
    }

    public async createNewSupplier(supplier:SupplierDTO) {
        return await this.SupplierRepository.insert(supplier);

    }


}
