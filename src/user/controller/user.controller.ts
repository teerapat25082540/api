import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { catchError, of, map } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guard/jwt-guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UserDto } from '../model/user.dto';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService){}

    @Post()
    async createData(@Body() userPoint: UserDto): Promise<UserDto | Object>{
        return await this.userService.createData(userPoint);
        
    }

    @Post('login')
    async login(@Body() user:UserDto): Promise<Object> {
        return await this.userService.login(user)
    }
    
    @UseGuards(JwtAuthGuard)
    @Get()
    async findAllData(): Promise<UserDto[]> {
        return await this.userService.findAllData();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param() params): Promise<UserDto> {
        return await this.userService.findOne(params.id);
    }

    @Put(':id')
    async updateData(
        @Param('id') id: string,
        @Body() userPoint: UserDto,
    ): Promise<UpdateResult> {
        return await this.userService.updateData(id, userPoint);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<DeleteResult> {
        return await this.userService.deleteData(id);
    }
}
