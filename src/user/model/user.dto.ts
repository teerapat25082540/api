import { ApiProperty } from "@nestjs/swagger";

export class UserDto {

    id?: string;
    @ApiProperty() username?: string;
    @ApiProperty() password?: string;
    @ApiProperty() firstname?: string;
    @ApiProperty() lastname?: string;
    @ApiProperty() email?: string;
    @ApiProperty() tel?: string;
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