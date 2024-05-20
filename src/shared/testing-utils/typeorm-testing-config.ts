import { TypeOrmModule } from '@nestjs/typeorm';
import { Socio } from '../../socio/socio.entity';
import { Club } from '../../club/club.entity';

export const TypeOrmTestingConfig = () => [
    TypeOrmModule.forRoot({
        type: 'sqlite',
        database: ':memory:',
        dropSchema: true,
        entities: [Socio, Club],
        synchronize: true,
        keepConnectionAlive: true
    }),
    TypeOrmModule.forFeature([Socio, Club])
];