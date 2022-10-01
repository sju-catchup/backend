import { IHAId, IHumanAction } from '../domain/human-action.interface';

export type HumanActionResponse = {
  HumanAction: IHumanAction;
};

export type HumanActionArrayResponse = {
  HumanAction: IHumanAction[];
};

export type HumanActionDeleteResponse = {
  human_action_id: IHAId;
};
