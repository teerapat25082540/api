import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { catchError, Observable, of, map } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { User } from '../model/user.interface';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService){}

    @Post()
    creatrData(@Body() userPoint: User): Observable<User | Object>{
        return this.userService.createData(userPoint).pipe(
            map((user: User) => user),
            catchError(err => of({error: err.message}))
        );
    }

    @Post('login')
    login(@Body() user:User): Observable<Object> {
        return this.userService.login(user).pipe(
            map((jwt: string) => {
                return {access_token: jwt};
            })
        )
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
