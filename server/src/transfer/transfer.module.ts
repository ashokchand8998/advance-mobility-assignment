import { Module } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { TransferController } from './transfer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transfer } from 'src/datasource/transfer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transfer])],
  providers: [TransferService],
  controllers: [TransferController]
})
export class TransferModule { }
