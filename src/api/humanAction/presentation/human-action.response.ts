import { IHumanAction } from '../domain/human-action.interface';

export type HumanActionResponse = {
  HumanAction: IHumanAction;
};

export type HumanActionArrayResponse = {
  HumanAction: IHumanAction[];
};
