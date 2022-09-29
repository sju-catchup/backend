import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/swagger';
import { IsString, ValidateNested } from 'class-validator';
import { IPosition } from '../domain/cctv.interface';

class Position implements IPosition {
  @IsString()
  x: string;

  @IsString()
  y: string;
}

export class CreateCCTVCommand {
  @IsString()
  address: string;

  @ValidateNested()
  @Type(() => Position)
  position: Position;
}

export class UpdateCCTVCommand extends PartialType(CreateCCTVCommand) {}
