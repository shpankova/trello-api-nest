import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  color: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  board_id: number;
}
