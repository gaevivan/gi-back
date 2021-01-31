import { TokenObject } from "./token-object.interface";
import { User } from "./user.interface";

export interface UserWithToken extends User, TokenObject {}