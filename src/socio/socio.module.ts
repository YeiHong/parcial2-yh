import { Module } from '@nestjs/common';
import { SocioService } from './socio.service';
import { SocioController } from './socio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Socio } from './socio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Socio])],
  providers: [SocioService],
  controllers: [SocioController]
})
export class SocioModule { }
