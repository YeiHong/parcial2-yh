import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Club } from './club.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClubService {
    constructor(
        @InjectRepository(Club)
        private readonly clubRepository: Repository<Club>
    ) { }

    async findAll(): Promise<Club[]> {
        return await this.clubRepository.find({ relations: ["socios"] });
    }

    async findOne(id: string): Promise<Club> {
        const club: Club = await this.clubRepository.findOne({ where: { id }, relations: ["socios"] });
        if (!club) {
            throw new NotFoundException('Club with ID ${id} not found');
        }
        return club;
    }

    async create(club: Club): Promise<Club> {
        if (club.description.length > 100) {
            throw new BadRequestException('Invalid description format, must be less than 100 caracters');
        }
        return await this.clubRepository.save(club)
    }

    async update(id: string, club: Club): Promise<Club> {
        const persitedClub: Club = await this.clubRepository.findOne({ where: { id } });
        if (!persitedClub) {
            throw new NotFoundException('Club with ID ${id} not found');
        }
        if (club.description.length > 100) {
            throw new BadRequestException('Invalid description format, must be less than 100 caracters');
        }
        return await this.clubRepository.save({ ...persitedClub, ...club });
    }

    async delete(id: string) {
        const club: Club = await this.clubRepository.findOne({ where: { id } });
        if (!club) {
            throw new NotFoundException('Club with ID ${id} not found');
        }
        await this.clubRepository.remove(club)
    }
}
