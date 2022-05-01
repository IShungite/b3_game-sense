import { MaxLength, MinLength } from "class-validator";
import { ObjectId } from "mongoose";

export class CreateProductDto {
  readonly shopId: ObjectId;

  readonly categoryId: ObjectId;

  readonly itemId: ObjectId;

  @MinLength(3)
  @MaxLength(30)
  readonly name: string;

  readonly price: number;

  @MinLength(3)
  @MaxLength(5000)
  readonly description: string;
}
