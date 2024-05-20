import { Module } from '@nestjs/common';
import { SocioClubService } from './socio-club.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Socio } from 'src/socio/socio.entity';
import { Club } from 'src/club/club.entity';

@Module({
  providers: [SocioClubService],
  imports: [TypeOrmModule.forFeature([Socio, Club])]
})
export class SocioClubModule { }
