import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateBoardDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  color: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
