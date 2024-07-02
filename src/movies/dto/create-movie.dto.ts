import { ApiProperty } from "@nestjs/swagger";

export class CreateMovieDto {
    @ApiProperty()
    title: string;
  
    @ApiProperty()
    genre: string;
  
    @ApiProperty()
    rating: number;
  
    @ApiProperty()
    streamingLink: string;
  }