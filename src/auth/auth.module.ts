import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './guard/jwt-guard';
import { JwtStrategy } from './guard/jwt.strategy';
import { AuthService } from './service/auth.service';

@Module({
    imports: [ 
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: {expiresIn: '100s'}
            })
        })
    ],
    providers: [AuthService, JwtAuthGuard, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {}
