import { Uuid } from "@shared/types/uuid.type";

export interface Link {
  id: Uuid;
  name: string;
  url: string;
}
