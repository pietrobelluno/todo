import { IsBoolean, IsISO8601, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsISO8601()
  dueDate: string;

  @IsOptional()
  @IsBoolean()
  status: boolean;
}
