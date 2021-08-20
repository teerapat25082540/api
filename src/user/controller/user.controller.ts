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
import { catchError, of, map } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guard/jwt-guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ReturnDataDto, UserDto } from '../model/user.dto';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  
  @UseGuards(JwtAuthGuard)
  @Post()
  async createData(@Body() userPoint: UserDto): Promise<UserDto | Object> {
    return await this.userService.createData(userPoint);
  }

  @Post('login')
  async login(@Body() user: UserDto): Promise<Object> {
    return await this.userService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllData(): Promise<UserDto[]> {
    return await this.userService.findAllData();
  }

  @UseGuards(JwtAuthGuard)
  @Post('getuser')
  async findUserById(@Body() params): Promise<any> {
    return await this.userService.findById(params.accessToken);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateData(
    @Param('id') id: string,
    @Body() userPoint: UserDto,
  ): Promise<UpdateResult> {
    return await this.userService.updateData(id, userPoint);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    return await this.userService.deleteData(id);
  }
}
