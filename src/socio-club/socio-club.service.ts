import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Club } from 'src/club/club.entity';
import { Socio } from 'src/socio/socio.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SocioClubService {
    constructor(
        @InjectRepository(Socio)
        private readonly socioRepository: Repository<Socio>,

        @InjectRepository(Club)
        private readonly clubRepository: Repository<Club>
    ) { }

    async addMemberToClub(socioID: string, clubID: string): Promise<Club> {
        const club: Club = await this.clubRepository.findOne({ where: { id: clubID }, relations: ['socios'] });
        if (!club)
            throw new NotFoundException(`The club with ID ${clubID} is not found`);
        const socio: Socio = await this.socioRepository.findOne({ where: { id: socioID }, relations: ['clubs'] });
        if (!socio)
            throw new NotFoundException(`The socio with ID ${socioID} is not found`);
        if (club.socios.find(s => s.id === socioID))
            throw new BadRequestException(`The socio with ID ${socioID} is already a member of the club`);
        club.socios = [...club.socios, socio];
        return await this.clubRepository.save(socio)
    }

    async findMembersFromClub(clubID: string): Promise<Socio[]> {
        const club: Club = await this.clubRepository.findOne({ where: { id: clubID }, relations: ['socios'] });
        if (!club)
            throw new NotFoundException(`The club with ID ${clubID} is not found`);
        return club.socios
    }

    async findMemberFromClub(clubID: string, socioID: string): Promise<Socio> {
        const club: Club = await this.clubRepository.findOne({ where: { id: clubID }, relations: ['socios'] });
        if (!club)
            throw new NotFoundException(`The club with ID ${clubID} is not found`);
        const socioClub: Socio = club.socios.find(s => s.id === socioID);
        if (!socioClub)
            throw new NotFoundException(`The socio with ID ${socioID} is not found in club with ID ${clubID}`);
        return socioClub;
    }

    async updateMembersFromClub(clubID: string, socios: Socio[]): Promise<Club> {
        const club: Club = await this.clubRepository.findOne({ where: { id: clubID }, relations: ['socios'] });
        if (!club)
            throw new NotFoundException(`The club with ID ${clubID} is not found`);
        for (let i = 0; i < socios.length; i++) {
            const socio: Socio = await this.socioRepository.findOne({ where: { id: socios[i].id } })
            if (!socio)
                throw new NotFoundException(`The socio with ID ${socios[i].id} is not found`);
        }
        club.socios = socios;
        return await this.clubRepository.save(club)
    }

    async deleteMemberFromClub(clubID: string, socioID: string) {
        const club: Club = await this.clubRepository.findOne({ where: { id: clubID }, relations: ['socios'] });
        if (!club)
            throw new NotFoundException(`The club with ID ${clubID} is not found`);
        const socioClub: Socio = club.socios.find(s => s.id === socioID);
        if (!socioClub)
            throw new NotFoundException(`The socio with ID ${socioID} is not found in club with ID ${clubID}`);
        club.socios = club.socios.filter(s => s.id !== socioID);
        await this.clubRepository.save(club)
    }
}
