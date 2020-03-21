import { isNullOrUndefined } from 'util';
import { Suppliers } from './../entities/suppliers.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupplierDTO } from '../dtos/supplier.dto';

@Injectable()
export class SuppliersService {

    constructor(@InjectRepository(Suppliers)
    private readonly SupplierRepository: Repository<Suppliers>, ) {

    }

    public async getSuppliers() {
        return await this.SupplierRepository.find({ where: [{ IsActive: 1 }], order: { SupplierID: 'ASC' } });
    }

    public async getSuppliersById(id: number) {
        return await this.SupplierRepository.findOne(id);
    }

    public async Save(supplier: Suppliers) {
        let result;
        if (Number(supplier.SupplierID) > 0) {
            result = await this.UpdateSupplier(supplier);
        } else {
            result = await this.createNewSupplier(supplier);
        }
        return result;
    }

    public async createNewSupplier(supplier: Suppliers) {
        return await this.SupplierRepository.insert(supplier);
    }

    public async UpdateSupplier(supplier: Suppliers) {
        supplier.UpdateDateTime = new Date();
        return await this.SupplierRepository.update(supplier.SupplierID, supplier);
    }


    public async DeleteSupplier(supplier: Suppliers) {
        supplier.IsActive = 0;
        return await this.SupplierRepository.update(supplier.SupplierID, supplier);
    }


}
