import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './../entities/user.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User)
    private readonly UserRepository: Repository<User>) { }


    public async getUserById(id: number) {

    }

    public async getUser() {

    }

    public async createUpdateUser() {

    }

    public async deleteUser() {

    }

}
