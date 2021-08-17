import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { match } from 'assert/strict';
import { catchError, from, Observable, switchMap, throwError, map } from 'rxjs';
import { AuthService } from 'src/auth/service/auth.service';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from '../model/user.entity';
import { User } from '../model/user.interface';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private authService: AuthService
    ){}

    findOne(id: string): Observable<User>{
        return from(this.userRepository.findOne({id})).pipe(
            map((user: User) => {
                const {password, ...result} = user;
                return result;
            })
        )
    }

    findAllData(): Observable<User[]>{
        return from(this.userRepository.find()).pipe(
            map((users) => {
                users.forEach(function (v) {
                    delete v.password
                });
                return users;
            })
        );
    }

    createData(user: User): Observable<User>{
        return this.authService.hashPassword(user.password).pipe(
            switchMap((passwordHash: string) => {
                const newUser = new UserEntity();
                newUser.username = user.username;
                newUser.password = passwordHash;
                newUser.firstname = user.firstname;
                newUser.lastname = user.lastname;
                newUser.email = user.email;
                newUser.tel = user.tel;

                return from(this.userRepository.save(newUser)).pipe(
                    map((user: User) => {
                        const {password, ...result} = user;
                        return result;
                    }),
                    catchError(err => throwError(err))
                )
            })
        )
        // return from(this.userRepository.save(userData));
    }

    updateData(id: string, userData: User): Observable<UpdateResult>{
        delete userData.username;
        delete userData.password;
        return from(this.userRepository.update(id,userData));
    }

    deleteData(id: string): Observable<DeleteResult>{
        return from(this.userRepository.delete(id));
    }

    login(user: User):Observable<string>{
        return this.validateUser(user.username, user.password).pipe(
            switchMap((user: User) => {
                if(user){
                    return this.authService.generateJWT(user).pipe(map((jwt: string) =>  jwt));
                }else{
                    return 'Wrong Credentials';
                }
            })
        )
    }

    validateUser(username: string, password: string): Observable<User> {
        return this.findByUsername(username).pipe(
            switchMap((user: User) => this.authService.comparePasswords(password, user.password).pipe(
                map((match: boolean) => {
                    if(match){
                        const{password, ...result} = user;
                        return result;
                    }else{
                        throw Error;
                    }
                })
            ))
        )
    }

    findByUsername(username: string): Observable<User> {
        return from(this.userRepository.findOne({username}));
    }
}
