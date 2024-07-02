import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiHeader,
} from '@nestjs/swagger';
import { MovieService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { RolesGuard } from '../auth/roles.guard';
import { headers } from 'src/utils';

@ApiTags('movies')
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  @ApiOperation({ summary: 'Get all movies' })
  @ApiResponse({ status: 200, description: 'Return all movies.' })
  async findAll(): Promise<Movie[]> {
    return this.movieService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get movie by ID' })
  @ApiResponse({ status: 200, description: 'Return the movie.' })
  @ApiResponse({ status: 404, description: 'Movie not found.' })
  async findOne(@Param('id') id: string): Promise<Movie> {
    return this.movieService.findOne(id);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search movies by title or genre' })
  @ApiResponse({ status: 200, description: 'Return matched movies.' })
  @ApiQuery({ name: 'title', required: false })
  @ApiQuery({ name: 'genre', required: false })
  async findByTitleOrGenre(
    @Query('title') title: string,
    @Query('genre') genre: string,
  ): Promise<Movie[]> {
    return this.movieService.findByTitleOrGenre(title, genre);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new movie',
    description: 'Adds a new movie to the lobby.',
  })
  @ApiResponse({
    status: 201,
    description: 'The movie has been successfully created.',
  })
  @UseGuards(RolesGuard)
  @ApiHeader(headers.access_permission)
  async create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.movieService.create(createMovieDto);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @ApiHeader(headers.access_permission)
  @ApiOperation({ summary: 'Update movie by ID' })
  @ApiResponse({
    status: 200,
    description: 'The movie has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Movie not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Promise<Movie> {
    return this.movieService.update(id, updateMovieDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @ApiHeader(headers.access_permission)
  @ApiOperation({ summary: 'Delete movie by ID' })
  @ApiResponse({
    status: 200,
    description: 'The movie has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Movie not found.' })
  async delete(@Param('id') id: string): Promise<Movie> {
    return this.movieService.delete(id);
  }
}
