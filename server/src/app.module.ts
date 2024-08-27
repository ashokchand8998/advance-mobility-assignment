import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DriverModule } from './driver/driver.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { TransferModule } from './transfer/transfer.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'vehicle-transfer.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, //to be set false in prod
    }),
    DriverModule,
    VehicleModule,
    TransferModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
