import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from 'src/datasource/vehicle.entity';
import { TransferService } from 'src/transfer/transfer.service';
import { Transfer } from 'src/datasource/transfer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, Transfer])],
  providers: [VehicleService, TransferService],
  controllers: [VehicleController]
})
export class VehicleModule {}
