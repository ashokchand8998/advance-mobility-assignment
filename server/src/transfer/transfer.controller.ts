import { Controller, Get } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { Transfer } from 'src/datasource/transfer.entity';

@Controller('transfers')
export class TransferController {
    constructor(private transferService: TransferService) { }

    @Get()
    async findAll(): Promise<Transfer[]> {
        return await this.transferService.findAll();
    }
}
