import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DriverService } from './driver.service';
import { Driver } from '../datasource/driver.entity';

@Controller('drivers')
export class DriverController {
    constructor(private driverService: DriverService) { }

    @Get()
    async findAll(): Promise<Driver[]> {
        return await this.driverService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Driver> {        
        return await this.driverService.findOne(id);
    }

    @Post()
    async create(@Body() driverData: Partial<Driver>): Promise<Driver> {
        return await this.driverService.create(driverData);
    }
}
