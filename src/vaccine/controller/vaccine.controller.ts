import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
// import { Promise } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Vaccine } from '../models/vaccine.interface';
import { VaccineService } from '../service/vaccine.service';

@Controller('vaccine')
export class VaccineController {
  constructor(private vaccineService: VaccineService) {}

  @Get()
  async findAllData(): Promise<Vaccine[]> {
    return await this.vaccineService.findAllData();
  }

  @Get(':user_id')
  async findAllDataFromId(@Param('user_id') user_id: string): Promise<Vaccine[]> {
    return await this.vaccineService.findAllDataFromId(user_id);
  }

  @Post()
  async createData(@Body() vaccinePoint: Vaccine): Promise<Vaccine> {
    return await this.vaccineService.createData(vaccinePoint);
  }

  @Put(':id')
  async updateData(
    @Param('id') id: string,
    @Body() vaccinePoint: Vaccine,
  ): Promise<UpdateResult> {
    return await this.vaccineService.updateData(id, vaccinePoint);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    return await this.vaccineService.deleteData(id);
  }
}
