import { Type } from 'class-transformer';
import {
  IsDate,
  IsNumber,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

export class FindManySuspect {
  @IsNumber()
  cctv_id: number;

  @IsDate()
  @Type(() => Date)
  start_time: Date;

  @IsDate()
  @Type(() => Date)
  end_time: Date;
}

class Create {
  @IsNumber()
  cctv_id: number;

  @IsDate()
  @Type(() => Date)
  time: Date;

  @IsUrl()
  url: string;

  @IsString()
  type: 'Suspect' | 'Result';
}

export class CreateDTO {
  @ValidateNested({ each: true })
  @Type(() => Create)
  entities: Create[];
}
