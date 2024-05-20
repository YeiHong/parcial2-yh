import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config'
import { ClubService } from './club.service';
import { Club } from './club.entity';
import { faker } from '@faker-js/faker'

describe('ClubService', () => {
  let service: ClubService;
  let repository: Repository<Club>;
  let clubsList: Club[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ClubService]
    }).compile();

    service = module.get<ClubService>(ClubService);
    repository = module.get<Repository<Club>>(getRepositoryToken(Club));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    clubsList = [];
    for (let i = 0; i < 5; i++) {
      const club: Club = await repository.save({
        name: faker.company.name(),
        foundationDate: faker.date.past().getFullYear(),
        image: faker.image.url(),
        description: faker.lorem.sentence(10).substring(0, 100)
      });
      clubsList.push(club)
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all clubs', async () => {
    const clubs: Club[] = await service.findAll();
    expect(clubs).not.toBeNull();
    expect(clubs).toHaveLength(clubsList.length);
  });

  it('findOne should return a club by id', async () => {
    const storedClub: Club = clubsList[0];
    const club: Club = await service.findOne(storedClub.id);
    expect(club).not.toBeNull();
    expect(club.name).toEqual(storedClub.name);
    expect(club.description).toEqual(storedClub.description);
    expect(club.foundationDate).toEqual(storedClub.foundationDate);
    expect(club.image).toEqual(storedClub.image);
  });

  it('create should return a new club', async () => {
    const club: Club = {
      id: '',
      name: faker.company.name(),
      foundationDate: faker.date.past().getFullYear(),
      image: faker.image.url(),
      description: faker.lorem.sentence(10).substring(0, 100),
      socios: []
    }

    const newClub: Club = await service.create(club);
    expect(newClub).not.toBeNull();

    const storedClub: Club = await repository.findOne({ where: { id: newClub.id } })
    expect(storedClub).not.toBeNull();
    expect(storedClub.name).toEqual(newClub.name);
    expect(storedClub.description).toEqual(newClub.description);
    expect(storedClub.foundationDate).toEqual(newClub.foundationDate);
    expect(storedClub.image).toEqual(newClub.image);
  });

  it('update should modify a club', async () => {
    const club: Club = clubsList[0];
    club.name = "New name"
    const updatedClub: Club = await service.update(club.id, club);
    expect(updatedClub).not.toBeNull;
    const storedClub: Club = await repository.findOne({ where: { id: club.id } });
    expect(storedClub).not.toBeNull;
    expect(storedClub.name).toEqual(club.name);
  });

  it('delete should remove a club', async () => {
    const club: Club = clubsList[0];
    await service.delete(club.id);
    const deletedClub: Club = await repository.findOne({ where: { id: club.id } });
    expect(deletedClub).toBeNull;
  });
});
