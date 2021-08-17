import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { User } from '../model/user.interface';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService){}

    @Post()
    creatrData(@Body() userPoint: User): Observable<User>{
        return this.userService.createData(userPoint);
    }
    
    @Get()
    findAllData(): Observable<User[]> {
        return this.userService.findAllData();
    }

    @Get(':id')
    findOne(@Param() params): Observable<User> {
        return this.userService.findOne(params.id);
    }

    @Put(':id')
    updateData(
        @Param('id') id: string,
        @Body() userPoint: User,
    ): Observable<UpdateResult> {
        return this.userService.updateData(id, userPoint);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Observable<DeleteResult> {
        return this.userService.deleteData(id);
    }
}
