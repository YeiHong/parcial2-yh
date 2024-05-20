import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocioModule } from './socio/socio.module';
import { ClubModule } from './club/club.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Socio } from './socio/socio.entity';
import { Club } from './club/club.entity';
import { SocioClubModule } from './socio-club/socio-club.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'parcial2',
    entities: [Socio, Club],
    dropSchema: true,
    synchronize: true,
    keepConnectionAlive: true
  }), SocioModule, ClubModule, SocioClubModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
