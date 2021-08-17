import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class UserEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('')
    username: string;

    @Column('')
    password: string;

    @Column('')
    firstname: string;

    @Column('')
    lastname: string;

    @Column('')
    email: string;

    @Column('')
    tel: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createAt: Date;

}