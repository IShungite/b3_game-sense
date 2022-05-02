import { MaxLength, MinLength } from "class-validator";
import { ObjectId } from "mongoose";

export class CreateCategoryDto {
  readonly shopId: ObjectId;

  @MinLength(3)
  @MaxLength(30)
  readonly name: string;
}
