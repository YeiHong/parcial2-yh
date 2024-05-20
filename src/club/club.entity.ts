import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Socio } from '../socio/socio.entity';

@Entity()
export class Club {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    foundationDate: number;

    @Column()
    image: string;

    @Column({ length: 100 })
    description: string;

    @ManyToMany(() => Socio, socio => socio.clubs)
    @JoinTable()
    socios: Socio[];
}
