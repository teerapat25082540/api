import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
  } from '@nestjs/common';
// import { Promise } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { JwtAuthGuard } from 'src/auth/guard/jwt-guard';
import { Vaccine } from '../models/vaccine.interface';
import { VaccineService } from '../service/vaccine.service';

@Controller('vaccine')
export class VaccineController {
  constructor(private vaccineService: VaccineService) {}
  
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllData(): Promise<Vaccine[]> {
    return await this.vaccineService.findAllData();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':user_id')
  async findAllDataFromId(@Param('user_id') user_id: string): Promise<Vaccine[]> {
    return await this.vaccineService.findAllDataFromId(user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createData(@Body() vaccinePoint: Vaccine): Promise<Vaccine> {
    return await this.vaccineService.createData(vaccinePoint);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateData(
    @Param('id') id: string,
    @Body() vaccinePoint: Vaccine,
  ): Promise<UpdateResult> {
    return await this.vaccineService.updateData(id, vaccinePoint);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    return await this.vaccineService.deleteData(id);
  }
}
