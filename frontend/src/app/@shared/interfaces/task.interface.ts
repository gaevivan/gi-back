import { Uuid } from "@shared/types/uuid.type";

export interface Task {
  id: Uuid;
  text: string;
}