import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from 'src/datasource/driver.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DriverService {
    constructor(@InjectRepository(Driver) private driverRepository: Repository<Driver>) { }

    async create(driverData: Partial<Driver>): Promise<Driver> {
        const driver = this.driverRepository.create(driverData)
        return await this.driverRepository.save(driverData);
    }

    async findAll(): Promise<Driver[]> {
        return await this.driverRepository.find();
    }

    async findOne(id: number): Promise<Driver> {
        return await this.driverRepository.findOneBy({ id });
    }
}
