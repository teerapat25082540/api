import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Vaccine } from '../models/vaccine.interface';
import { VaccineService } from '../service/vaccine.service';

@Controller('vaccine')
export class VaccineController {
  constructor(private vaccineService: VaccineService) {}

  @Get()
  findAllData(): Observable<Vaccine[]> {
    return this.vaccineService.findAllData();
  }

  @Post()
  createData(@Body() vaccinePoint: Vaccine): Observable<Vaccine> {
    return this.vaccineService.createData(vaccinePoint);
  }

  @Put(':id')
  updateData(
    @Param('id') id: number,
    @Body() vaccinePoint: Vaccine,
  ): Observable<UpdateResult> {
    return this.vaccineService.updateData(id, vaccinePoint);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Observable<DeleteResult> {
    return this.vaccineService.deleteData(id);
  }
}
