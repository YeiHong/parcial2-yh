import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Club } from '../club/club.entity';

@Entity()
export class Socio {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    birthDate: number;

    @ManyToMany(() => Club, club => club.socios)
    clubs: Club[];
}
