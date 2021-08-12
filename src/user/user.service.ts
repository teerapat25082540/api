import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, getConnection, Repository } from 'typeorm';
import { CreateUserDto} from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ){}

  async createOrUpdate(user: UserEntity):Promise<UserEntity> {
    return await this.userRepository.save(user);
  }

  // users: UserEntity[] = [];

  async insert(userDetails: CreateUserDto): Promise<UserEntity> {
    const userEntity: UserEntity = UserEntity.create();
    const {username, password, firstName, lastName, email, telNum} = userDetails;
    userEntity.username = username;
    userEntity.password = password;
    userEntity.firstName = firstName;
    userEntity.lastName = lastName;
    userEntity.email = email;
    userEntity.telNum = telNum;
    await UserEntity.save(userEntity);
    return userEntity;
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return await UserEntity.find();
  }

  async findOne(id: string):Promise<UserEntity> {
    return await this.userRepository.findOne({id:id});
  }

  async findAll():Promise<UserEntity[]>{
    return await this.userRepository.find();
  }

  async delete(id: string):Promise<DeleteResult>{
    return await this.userRepository.delete({id:id});
  }


  // async remove(id: string): Promise<void> {
  //   await this.usersRepository.delete(id);
  // }


  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
