import { ApiProperty } from '@nestjs/swagger';
import { type } from 'os';
import { Entity, Column, PrimaryGeneratedColumn, Unique, CreateDateColumn, PrimaryColumn, BaseEntity } from 'typeorm';

@Entity()
export class UserEntity extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    unique: true
  })
  username: string;

  @Column('text')
  password:string;

  @ApiProperty() //The plugin will automatically generate any missing swagger properties, but if you need to override them, you simply set them explicitly via @ApiProperty().
  @Column('text')
  firstName: string;

  @ApiProperty()
  @Column('text')
  lastName: string;

  @Column({
    type: 'text',
    unique: true
  })
  email: string;

  @Column({
    type: 'text',
    unique: true
  })
  telNum: string;

}
