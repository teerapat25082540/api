import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsEmail, IsMobilePhone, IsNotEmpty, IsPhoneNumber } from "class-validator";
import { Column } from "typeorm";

export class UserDto {

    id?: string;

    @IsAlphanumeric()
    @IsNotEmpty({ message: 'The username is required' })
    @ApiProperty()
    username?: string;

    @IsAlphanumeric()
    @IsNotEmpty({ message: 'The password is required' })
    @ApiProperty()
    password?: string;

    @ApiProperty()
    @IsAlphanumeric()
    @IsAlphanumeric()
    @IsNotEmpty({ message: 'The firstname is required' })
    firstname?: string;

    @ApiProperty()
    @IsAlphanumeric()
    @IsNotEmpty({ message: 'The lassname is required' })
    lastname?: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'The email is required' })
    @IsEmail()
    email?: string;

    @ApiProperty()
    @IsPhoneNumber('TH')
    @IsNotEmpty({ message: 'The telephone number is required' })
    tel: string;

    createAt?: Date;
}

export class ReturnDataDto {
    @ApiProperty() username?: string;
    @ApiProperty() firstname?: string;
    @ApiProperty() lastname?: string;
    @ApiProperty() email?: string;
    @ApiProperty() tel?: string;
    createAt?: Date;
}