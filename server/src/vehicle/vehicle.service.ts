import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from 'src/datasource/vehicle.entity';
import { TransferService } from 'src/transfer/transfer.service';
import { Repository } from 'typeorm';

@Injectable()
export class VehicleService {
    constructor(@InjectRepository(Vehicle) private vehicleRepository: Repository<Vehicle>,
        private transferService: TransferService) { }

    async create(vehicleData: Partial<Vehicle>): Promise<Vehicle> {
        const vehicle = this.vehicleRepository.create(vehicleData)
        return await this.vehicleRepository.save(vehicleData);
    }

    async findAll(): Promise<Vehicle[]> {
        return await this.vehicleRepository.find();
    }

    async findOne(id: number): Promise<Vehicle> {
        return await this.vehicleRepository.findOneBy({ id });
    }

    async transferVehicle(vehicleId: number, transferData: { newOwnerId: number, newOwnerType: string, newOwnerName: string }): Promise<Vehicle> {
        const vehicle = await this.vehicleRepository.findOneBy({ id: vehicleId });
        if (!vehicle) {
            throw new Error('Vehicle not found');
        }
        let previousOwnerData = {
            previousOwnerId: vehicle.currentOwnerId,
            previousOwnerType: vehicle.currentOwnerType,
            previousOwnerName: vehicle.currentOwnerName
        }
        vehicle.currentOwnerId = transferData.newOwnerId;
        vehicle.currentOwnerName = transferData.newOwnerName;
        vehicle.currentOwnerType = transferData.newOwnerType;
        const updatedVehicle = await this.vehicleRepository.save(vehicle);

        // inserting transfer details
        await this.transferService.recordTransfer(vehicleId, transferData, previousOwnerData);
        return updatedVehicle;
    }
}
