import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'vehicle-transfer.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, //to be set false in prod
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
