import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { plainToInstance } from 'class-transformer';
import { SocioService } from './socio.service';
import { Socio } from './socio.entity';
import { SocioDto } from './socio.dto';

@Controller('members')
@UseInterceptors(BusinessErrorsInterceptor)
export class SocioController {
    constructor(private readonly socioService: SocioService) { }

    @Get()
    async findAll(): Promise<Socio[]> {
        return await this.socioService.findAll();
    }

    @Get(':socioId')
    async findOne(@Param('socioId') socioId: string) {
        return await this.socioService.findOne(socioId);
    }

    @Post()
    async create(@Body() socioDto: SocioDto) {
        const socio: Socio = plainToInstance(Socio, socioDto);
        return await this.socioService.create(socio);
    }

    @Put(':socioId')
    async update(@Param('socioId') socioId: string, @Body() socioDto: SocioDto) {
        const socio: Socio = plainToInstance(Socio, socioDto);
        return await this.socioService.update(socioId, socio);
    }

    @Delete(':socioId')
    @HttpCode(204)
    async delete(@Param('socioId') socioId: string) {
        return await this.socioService.delete(socioId);
    }
}
