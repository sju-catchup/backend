import { IsString } from 'class-validator';
import { IHumanAction } from '../domain/human-action.interface';

export class UpdateHumanActionCommand implements Pick<IHumanAction, 'type'> {
  @IsString()
  type: string;
}
