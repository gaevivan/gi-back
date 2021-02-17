import { Uuid } from "@shared/types/uuid.type";

export interface Note {
  id: Uuid;
  name: string;
  text: string;
}