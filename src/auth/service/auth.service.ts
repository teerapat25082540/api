import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable, of } from 'rxjs';
import { ReturnDataDto, UserDto } from 'src/user/model/user.dto';
const bcrypt = require('bcrypt');

interface userData {
    username: ""
}
@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService){}

    async generateJWT(user: string): Promise <string> {
        // console.log(this.jwtService.signAsync({user}))
        return await this.jwtService.signAsync({user});
        // return null
    }

    hashPassword(password: string): Observable <string> {
        return from<string>(bcrypt.hash(password, 12));
    }

    async comparePasswords(newPassword: string, passwordHash: string): Promise <boolean> {
        return await bcrypt.compare(newPassword, passwordHash);
    }

    // comparePasswords(newPassword: string, passwordHash: string): Observable<any>{
    //     return from(bcrypt.compare(newPassword, passwordHash));
    // }

}
