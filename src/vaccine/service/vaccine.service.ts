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

  findAllData(): Observable<Vaccine[]> {
    return from(this.vaccineRepository.query("SELECT * FROM public.vaccine"));
  }

  findAllDataFromId(user_id: string): Observable<Vaccine[]> {
    return from(this.vaccineRepository.query(`SELECT * FROM public.vaccine WHERE user_id = '${user_id}'`));
  }

  createData(vaccineData: Vaccine): Observable<Vaccine> {
    return from(this.vaccineRepository.save(vaccineData));
  }

  updateData(id: string, vaccineData: Vaccine): Observable<UpdateResult> {
    return from(this.vaccineRepository.update(id, vaccineData));
  }

  deleteData(id: string): Observable<DeleteResult> {
    return from(this.vaccineRepository.delete(id));
  }
}
