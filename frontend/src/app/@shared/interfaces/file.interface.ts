import { Uuid } from "@shared/types/uuid.type";

export interface File {
  name: string;
  createdAt: string;
  createdBy: Uuid;
  modifyAt: string;
  modifyBy: Uuid;
}
