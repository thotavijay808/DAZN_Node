import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { RolesGuard } from '../auth/roles.guard';
import { MovieService } from './movies.service';
import { headers } from '../utils';

describe('MovieController (e2e)', () => {
  let app: INestApplication;
  let movieService: MovieService;
 
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    movieService = moduleFixture.get<MovieService>(MovieService);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/GET movies', () => {
    return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
  });

  it('/GET movies/:id', () => {
    const movieId = '66845e262d067a146c638e31';
    return request(app.getHttpServer())
      .get(`/movies/${movieId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toBe(movieId);
      });
  });

  it('/GET movies/search', () => {
    const title = 'Anji';
    const genre = 'Sci-Fi';

    return request(app.getHttpServer())
      .get('/movies/search')
      .query({ title, genre })
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeDefined();
        expect(Array.isArray(res.body)).toBeTruthy();
      });
  });

  it('/POST movies', () => {
    const createMovieDto: CreateMovieDto = {
      title: 'Hanuman',
      genre: 'Sci-Fi',
      rating: 9,
      streamingLink: 'https://example.com/Hanuman',
    };

    return request(app.getHttpServer())
      .post('/movies')
      .send(createMovieDto)
      .expect(201)
      .expect((res) => {
        expect(res.body.title).toBe(createMovieDto.title);
        expect(res.body.genre).toBe(createMovieDto.genre);
      });
  });

  it('/PUT movies/:id', () => {
    const movieId = '66845e262d067a146c638e31';
    const updateMovieDto: UpdateMovieDto = {
      title: 'Updated Movie Title',
    };

    return request(app.getHttpServer())
      .put(`/movies/${movieId}`)
      .send(updateMovieDto)
      .expect(200)
      .expect((res) => {
        expect(res.body.title).toBe(updateMovieDto.title);
      });
  });

  it('/DELETE movies/:id', () => {
    const movieId = '66845e262d067a146c638e31';

    return request(app.getHttpServer())
      .delete(`/movies/${movieId}`)
      .expect(200);
  });
});
