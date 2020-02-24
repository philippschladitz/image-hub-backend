import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PinsService } from './pins.service';
import { PinsController } from './pins.controller';
import { Pin } from './pin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pin])],
  controllers: [PinsController],
  providers: [PinsService],
})
export class PinsModule {}
