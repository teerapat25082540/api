import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { match } from 'assert/strict';
import { catchError, from, switchMap, throwError, map, Observable } from 'rxjs';
import { AuthService } from 'src/auth/service/auth.service';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from '../model/user.entity';
import { UserDto } from '../model/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private authService: AuthService,
  ) {}

  async findOne(id: string): Promise<UserDto> {
    return await this.userRepository.findOne({ id });
    // .pipe(
    //   map((user: UserDto) => {
    //     const { password, ...result } = user;
    //     return result;
    //   }),
    // );
  }

  async findAllData(): Promise<UserDto[]> {
    return await this.userRepository.find();
  }

  createData(user: UserDto): Observable<UserDto> {
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
          map((user: UserDto) => {
            const { password, ...result } = user;
            return result;
          }),
          catchError((err) => throwError(err)),
        );
      }),
    );
  }

  //   async createData(user: UserDto): Promise<UserDto> {

  //     return await this.userRepository.save(user);

  //   }

  async updateData(id: string, userData: UserDto): Promise<UpdateResult> {
    return await this.userRepository.update(id, userData);
  }

  async deleteData(id: string): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }

  async login(user: UserDto): Promise<any> {
    const userx = await this.validateUser(user.username, user.password);
    return userx;
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.findByUsername(username);

    const comparePass = await this.authService.comparePasswords(
      password,
      user.password,
    );

    if (comparePass) {
      const { password, ...result } = user;
      const accessToken = await this.authService.generateJWT(user);
      return { accessToken: accessToken, userData: user };
    } else {
      throw Error;
    }
  }

  async findByUsername(username: string): Promise<UserDto> {
    return await this.userRepository.findOne({ username: username });
  }
}
