import { IsNotEmpty, IsString, IsNumber, IsDate } from 'class-validator';

export class UpdateCardDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  estimate: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsDate()
  due_date: string;

  @IsNotEmpty()
  @IsString()
  labels: string;

  @IsNotEmpty()
  @IsNumber()
  card_id: number;
}
