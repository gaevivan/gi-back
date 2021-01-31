import { Entities } from "@shared/enums/entity.enum";
import { Field } from "./field.interface";

export interface Entity {
  fields: Field[];
  entity: Entities;
  links: Entities[];
}