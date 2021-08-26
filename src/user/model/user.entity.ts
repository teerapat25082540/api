import { IsEmail, IsMobilePhone, IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class UserEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true,
        nullable: true })
    username: string;

    @Column({ nullable: true })
    password: string;

    @Column({ nullable: true })
    firstname: string;

    @Column({ nullable: true })
    lastname: string;

    @Column({ unique: true,
        nullable: true })
    email: string;

    @Column({ nullable: true })
    tel: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createAt: Date;

}