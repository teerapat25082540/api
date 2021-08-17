import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from '../model/user.entity';
import { User } from '../model/user.interface';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ){}

    findAllData(): Observable<User[]>{
        return from(this.userRepository.query('SELECT * FROM public.user'));
    }

    createData(userData: User): Observable<User>{
        return from(this.userRepository.save(userData));
    }

    updateData(id: string, userData: User): Observable<UpdateResult>{
        return from(this.userRepository.update(id,userData));
    }

    deleteData(id: string): Observable<DeleteResult>{
        return from(this.userRepository.delete(id));
    }
}
