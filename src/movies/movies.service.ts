import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel('Movie') private readonly movieModel: Model<Movie>,
  ) {}

  async findAll(): Promise<Movie[]> {
    return this.movieModel.find().exec();
  }

  async findOne(id: string): Promise<Movie> {
    return this.movieModel.findById(id).exec();
  }

  async findByTitleOrGenre(title: string, genre: string): Promise<Movie[]> {
    return this.movieModel.find({ $or: [{ title }, { genre }] }).exec();
  }

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const createdMovie = new this.movieModel(createMovieDto);
    return createdMovie.save();
  }

  async update(id: string, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    return this.movieModel
      .findByIdAndUpdate(id, updateMovieDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Movie> {
    return this.movieModel.findByIdAndDelete(id).exec();
  }
}
