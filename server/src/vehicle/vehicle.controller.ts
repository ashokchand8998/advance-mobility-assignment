import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { Vehicle } from 'src/datasource/vehicle.entity';

@Controller('vehicles')
export class VehicleController {
    constructor(private vehicleService: VehicleService) { }

    @Post()
    async create(@Body() vehicleData: Partial<Vehicle>): Promise<Vehicle> {
        return await this.vehicleService.create(vehicleData);
    }

    @Get()
    async findAll(): Promise<Vehicle[]> {
        return await this.vehicleService.findAll();
    }

    @Post('/:id/transfer')
    async transfer(
        @Param('id') id: number,
        @Body() transferData: { newOwnerType: string, newOwnerId: number, newOwnerName: string }): Promise<Vehicle> {

        return await this.vehicleService.transferVehicle(
            id,
            transferData
        );
    }
}
