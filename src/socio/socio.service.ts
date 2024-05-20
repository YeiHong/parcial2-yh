import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Socio } from './socio.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SocioService {
    constructor(
        @InjectRepository(Socio)
        private readonly socioRepository: Repository<Socio>
    ) { }

    async findAll(): Promise<Socio[]> {
        return await this.socioRepository.find({ relations: ["clubs"] })
    }

    async findOne(id: string): Promise<Socio> {
        const socio: Socio = await this.socioRepository.findOne({ where: { id }, relations: ["clubs"] });
        if (!socio) {
            throw new NotFoundException('Socio with ID ${id} not found');
        }
        return socio;
    }

    async create(socio: Socio): Promise<Socio> {
        if (!socio.email.includes('@')) {
            throw new BadRequestException('Invalid email format, must includes @');
        }
        return await this.socioRepository.save(socio);
    }

    async update(id: string, socio: Socio): Promise<Socio> {
        const persistedSocio: Socio = await this.socioRepository.findOne({ where: { id } });
        if (!persistedSocio) {
            throw new NotFoundException("Socio with ID ${id} not found");
        }
        if (!socio.email.includes('@')) {
            throw new BadRequestException('Invalid email format, must includes @');
        }
        return await this.socioRepository.save({ ...persistedSocio, ...socio });
    }

    async delete(id: string) {
        const socio: Socio = await this.socioRepository.findOne({ where: { id } });
        if (!socio) {
            throw new NotFoundException('Socio with ID ${id} not found');
        }
        await this.socioRepository.remove(socio);
    }

}
