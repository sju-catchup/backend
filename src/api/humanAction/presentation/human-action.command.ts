import { IsDate, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';
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
  start_time: Date;

  @IsDate()
  end_time: Date;

  @IsUrl()
  uri: string;

  @IsNumber()
  cctv_id: number;
}
