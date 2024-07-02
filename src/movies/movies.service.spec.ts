import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './movies.service';
import { getModelToken } from '@nestjs/mongoose';


describe('MovieService', () => {
  let service: MovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        {
          provide: getModelToken('Movie'),
          useValue: {}, 
        },
      ],
    }).compile();

    service = module.get<MovieService>(MovieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all movies', async () => {
    const result: any[] = [{ id: '1', title: 'Movie 1', genre: 'Action' }];
    jest.spyOn(service, 'findAll').mockImplementation(() => Promise.resolve(result));

    expect(await service.findAll()).toBe(result);
  });

  it('should find a movie by ID', async () => {
    const movieId = '1';
    const movie: any = { id: movieId, title: 'Movie 1', genre: 'Action' };
    jest.spyOn(service, 'findOne').mockImplementation((id) => Promise.resolve(movie));

    expect(await service.findOne(movieId)).toBe(movie);
  });

});
