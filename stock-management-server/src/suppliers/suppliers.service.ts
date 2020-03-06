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
        return await this.SupplierRepository.find({where:{IsActive: true}});
    }
    public async getSupplier(id:number) {
        return await this.SupplierRepository.findOne(id);
    }

    public async createNewSupplier(supplier:SupplierDTO) {
        return await this.SupplierRepository.save(supplier);

    }


}
