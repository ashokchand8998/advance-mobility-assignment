import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transfer } from 'src/datasource/transfer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransferService {
    constructor(@InjectRepository(Transfer) private transferRepository: Repository<Transfer>) { }

    async recordTransfer(vehicleId: number, newOwnerDetails: any, previousOwnerData: any): Promise<Transfer> {
        const transfer = this.transferRepository.create({
            vehicle: { id: vehicleId },
            newOwnerId: newOwnerDetails.newOwnerId,
            newOwnerType: newOwnerDetails.newOwnerType,
            newOwnerName: newOwnerDetails.newOwnerName,
            previousOwnerId: previousOwnerData.previousOwnerId,
            previousOwnerType: previousOwnerData.previousOwnerType,
            previousOwnerName: previousOwnerData.previousOwnerName
        })

        return await this.transferRepository.save(transfer);
    }

    async findAll(): Promise<Transfer[]> {
        return await this.transferRepository.find({relations: ['vehicle']});
    }
}
