import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VaccineController } from './controller/vaccine.controller';
import { VaccineEntity } from './models/vaccine.entity';
import { VaccineService } from './service/vaccine.service';

@Module({
  imports: [TypeOrmModule.forFeature([VaccineEntity])],
  controllers: [VaccineController],
  providers: [VaccineService]
})
export class VaccineModule {}
