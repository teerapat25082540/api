import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {

  constructor(private userService: UserService){}

  @Post('')
  async postUser( @Body() newUser: CreateUserDto): Promise<UserEntity>{
    const user = new UserEntity();
    user.username = newUser.username;
    user.password = newUser.password;
    user.firstName = newUser.firstName;
    user.lastName = newUser.lastName;
    user.email = newUser.email;
    user.telNum = newUser.telNum;
    return await this.userService.createOrUpdate(user);
  }

  @Get()
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userService.findAll();
  }

  @Get(':uuid')
  async getUser(@Param('uuid') id: string):Promise<UserEntity>{
    return await this.userService.findOne(id);
  }

  @Put(':uuid')
  async updateUser(
    @Param('uuid') id: string,
    @Body() createUserDto: CreateUserDto,
  ):Promise<UserEntity>{
    const user = await this.userService.findOne(id);
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.telNum = createUserDto.telNum;
    return await this.userService.createOrUpdate(user);
  }

  @Delete(':uuid')
  async deleteUser(@Param('uuid') id: string): Promise<any> {
    await this.userService.delete(id);
    return { success: true };
  }


  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
