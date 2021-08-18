import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable, of } from 'rxjs';
import { UserDto } from 'src/user/model/user.dto';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService){}

    async generateJWT(user: UserDto): Promise <string> {
        return await this.jwtService.signAsync({user});
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
