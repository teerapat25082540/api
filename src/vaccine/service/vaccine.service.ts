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
    return from(this.vaccineRepository.query('SELECT * FROM public.vaccine'));
  }

  createData(vaccineData: Vaccine): Observable<Vaccine> {
    return from(this.vaccineRepository.save(vaccineData));
  }

  updateData(id: number, vaccineData: Vaccine): Observable<UpdateResult> {
    return from(this.vaccineRepository.update(id, vaccineData));
  }

  deleteData(id: number): Observable<DeleteResult> {
    return from(this.vaccineRepository.delete(id));
  }
}
