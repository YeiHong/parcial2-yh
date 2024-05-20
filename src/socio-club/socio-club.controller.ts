import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { SocioClubService } from './socio-club.service';
import { Socio } from 'src/socio/socio.entity';
import { SocioDto } from 'src/socio/socio.dto';

@Controller('clubs')
@UseInterceptors(BusinessErrorsInterceptor)
export class ClubSocioController {
    constructor(private readonly socioClubService: SocioClubService) { }

    @Post(':clubId/members/:socioId')
    async addMemberToClub(@Param('clubId') clubId: string, @Param('socioId') socioId: string) {
        return await this.socioClubService.addMemberToClub(socioId, clubId);
    }

    @Get(':clubId/members')
    async findMembersFromClub(@Param('clubId') clubId: string) {
        return await this.socioClubService.findMembersFromClub(clubId);
    }

    @Get(':clubId/members/:socioId')
    async findMemberFromClub(@Param('clubId') clubId: string, @Param('socioId') socioId: string) {
        return await this.socioClubService.findMemberFromClub(clubId, socioId);
    }

    @Put(':clubId/members')
    async updateMembersFromClub(@Body() sociosDto: SocioDto[], @Param('clubId') clubId: string) {
        const socios = plainToInstance(Socio, sociosDto);
        return await this.socioClubService.updateMembersFromClub(clubId, socios);
    }

    @Delete(':clubId/members/:socioId')
    @HttpCode(204)
    async deleteMemberFromClub(@Param('clubId') clubId: string, @Param('socioId') socioId: string) {
        return await this.socioClubService.deleteMemberFromClub(clubId, socioId);
    }
}
