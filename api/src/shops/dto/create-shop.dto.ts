import { MaxLength, MinLength } from "class-validator";
import { ObjectId } from "mongoose";

export class CreateShopDto {
  @MinLength(3)
  @MaxLength(15)
  readonly name: string;

  readonly school_id: ObjectId;
}
