import { Uuid } from "../types/uuid.type";
import { User } from "./user.interface";

export interface UserWithToken extends User {
  token: Uuid;
}