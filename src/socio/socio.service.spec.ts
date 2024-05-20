import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config'
import { SocioService } from './socio.service';
import { Socio } from './socio.entity';
import { faker } from '@faker-js/faker'

describe('SocioService', () => {
    let service: SocioService;
    let repository: Repository<Socio>;
    let sociosList: Socio[];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [...TypeOrmTestingConfig()],
            providers: [SocioService]
        }).compile();

        service = module.get<SocioService>(SocioService);
        repository = module.get<Repository<Socio>>(getRepositoryToken(Socio));
        await seedDatabase();
    });

    const seedDatabase = async () => {
        repository.clear();
        sociosList = [];
        for (let i = 0; i < 5; i++) {
            const socio: Socio = await repository.save({
                username: faker.internet.userName(),
                email: faker.internet.email(),
                birthDate: faker.date.past().getFullYear(),
            });
            sociosList.push(socio);
        };
    }

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('findAll should return all Socios', async () => {
        const Socios: Socio[] = await service.findAll();
        expect(Socios).not.toBeNull();
        expect(Socios).toHaveLength(sociosList.length);
    });

    it('findOne should return a Socio by id', async () => {
        const storedSocio: Socio = sociosList[0];
        const Socio: Socio = await service.findOne(storedSocio.id);
        expect(Socio).not.toBeNull();
        expect(Socio.username).toEqual(storedSocio.username);
        expect(Socio.email).toEqual(storedSocio.email);
        expect(Socio.birthDate).toEqual(storedSocio.birthDate);
    });

    it('create should return a new Socio', async () => {
        const Socio: Socio = {
            id: '',
            username: faker.internet.userName(),
            email: faker.internet.email(),
            birthDate: faker.date.past().getFullYear(),
            clubs: []
        }

        const newSocio: Socio = await service.create(Socio);
        expect(newSocio).not.toBeNull();

        const storedSocio: Socio = await repository.findOne({ where: { id: newSocio.id } })
        expect(storedSocio).not.toBeNull();
        expect(Socio.username).toEqual(storedSocio.username);
        expect(Socio.email).toEqual(storedSocio.email);
        expect(Socio.birthDate).toEqual(storedSocio.birthDate);
    });

    it('update should modify a Socio', async () => {
        const Socio: Socio = sociosList[0];
        Socio.username = "New username"
        const updatedSocio: Socio = await service.update(Socio.id, Socio);
        expect(updatedSocio).not.toBeNull;
        const storedSocio: Socio = await repository.findOne({ where: { id: Socio.id } });
        expect(storedSocio).not.toBeNull;
        expect(storedSocio.username).toEqual(Socio.username);
    });

    it('delete should remove a Socio', async () => {
        const Socio: Socio = sociosList[0];
        await service.delete(Socio.id);
        const deletedSocio: Socio = await repository.findOne({ where: { id: Socio.id } });
        expect(deletedSocio).toBeNull;
    });
});