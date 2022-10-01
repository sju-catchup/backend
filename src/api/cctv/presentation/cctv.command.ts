import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/swagger';
import { IsString, ValidateNested } from 'class-validator';
import { IPosition } from '../domain/cctv.interface';
import { CreateCCTVDTO, UpdateCCTVDTO } from '../application/cctv.dto';

class Position implements IPosition {
  @IsString()
  x: string;

  @IsString()
  y: string;
}

export class CreateCCTVCommand implements CreateCCTVDTO {
  @IsString()
  address: string;

  @ValidateNested()
  @Type(() => Position)
  position: Position;
}

export class UpdateCCTVCommand
  extends PartialType(CreateCCTVCommand)
  implements UpdateCCTVDTO {}
