import { Type } from 'class-transformer';
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import {
  CreateHumanActionDTO,
  UpdateHumanActionDTO,
} from '../application/human-action.dto';

export class UpdateHumanActionCommand implements UpdateHumanActionDTO {
  @IsOptional()
  @IsString()
  type?: string;
}

export class CreateHumanActionCommand implements CreateHumanActionDTO {
  @IsString()
  type: string;

  @IsDate()
  @Type(() => Date)
  start_time: Date;

  @IsDate()
  @Type(() => Date)
  end_time: Date;

  @IsUrl()
  url: string;

  @IsNumber()
  @Type(() => Number)
  cctv_id: number;
}

export class CreateHAList {
  @ValidateNested({ each: true })
  @Type(() => CreateHumanActionCommand)
  has: CreateHumanActionCommand[];
}
