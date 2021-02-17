import { Uuid } from "@shared/types/uuid.type";

export type WithId<T extends object> = T & { id: Uuid };
