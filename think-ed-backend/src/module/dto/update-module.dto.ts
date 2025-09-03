// src/module/dto/update-module.dto.ts
import { IsString, IsOptional } from 'class-validator';

export class UpdateModuleDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;
}