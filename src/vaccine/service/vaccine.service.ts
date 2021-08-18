import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { VaccineEntity } from '../models/vaccine.entity';
import { Vaccine } from '../models/vaccine.interface';

@Injectable()
export class VaccineService {
  constructor(
    @InjectRepository(VaccineEntity)
    private readonly vaccineRepository: Repository<VaccineEntity>,
  ) {}

  async findAllData(): Promise<Vaccine[]> {
    return await this.vaccineRepository.query("SELECT * FROM public.vaccine");
  }

  async findAllDataFromId(user_id: string): Promise<Vaccine[]> {
    return await this.vaccineRepository.query(`SELECT * FROM public.vaccine WHERE user_id = '${user_id}'`);
  }

  async createData(vaccineData: Vaccine): Promise<Vaccine> {
    return await this.vaccineRepository.save(vaccineData);
  }

  async updateData(id: string, vaccineData: Vaccine): Promise<UpdateResult> {
    return await this.vaccineRepository.update(id, vaccineData);
  }

  async deleteData(id: string): Promise<DeleteResult> {
    return await this.vaccineRepository.delete(id);
  }
}
