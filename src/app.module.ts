import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { MovieModule } from './movies/movies.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    MovieModule,
  ],
})
export class AppModule {}
