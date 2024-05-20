import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { plainToInstance } from 'class-transformer';
import { ClubService } from './club.service';
import { Club } from './club.entity';
import { ClubDto } from './club.dto';

@Controller('clubs')
@UseInterceptors(BusinessErrorsInterceptor)
export class ClubController {
    constructor(private readonly clubService: ClubService) { }

    @Get()
    async findAll(): Promise<Club[]> {
        return await this.clubService.findAll();
    }

    @Get(':clubId')
    async findOne(@Param('clubId') clubId: string) {
        return await this.clubService.findOne(clubId);
    }

    @Post()
    async create(@Body() clubDto: ClubDto) {
        const club: Club = plainToInstance(Club, clubDto);
        return await this.clubService.create(club);
    }

    @Put(':clubId')
    async update(@Param('clubId') clubId: string, @Body() clubDto: ClubDto) {
        const club: Club = plainToInstance(Club, clubDto);
        return await this.clubService.update(clubId, club);
    }

    @Delete(':clubId')
    @HttpCode(204)
    async delete(@Param('clubId') clubId: string) {
        return await this.clubService.delete(clubId);
    }
}
