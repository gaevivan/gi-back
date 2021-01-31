import { Uuid } from "../types/uuid.type";

export interface User {
  id: Uuid;
  login: string;
}