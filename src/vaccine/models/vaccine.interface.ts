import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber } from "class-validator";

export class Vaccine {
    id?: string;

    @IsNotEmpty({ message: 'The user_id is required' })
    user_id?: string;

    @IsNotEmpty({ message: 'The name is required' })
    name?: string;

    @IsNotEmpty({ message: 'The amount is required' })
    amount?: number;

    @IsNotEmpty({ message: 'The email is required' })
    email?: string;

    @IsPhoneNumber('TH')
    @IsNotEmpty({ message: 'The tel is required' })
    tel?: string;

    @IsNotEmpty({ message: 'The lat is required' })
    lat?: number;

    @IsNotEmpty({ message: 'The long is required' })
    long?: number;

    @IsNotEmpty({ message: 'The description is required' })
    description?: string;

    @IsNotEmpty({ message: 'The createAt is required' })
    createAt?: Date;
  }
  