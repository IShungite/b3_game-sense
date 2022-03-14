import { IsCurrency, MaxLength, MinLength } from "class-validator";
import { ObjectId } from "mongoose";

export class CreateProductDto {
  readonly shop_id: ObjectId;

  @MinLength(3)
  @MaxLength(30)
  readonly name: string;

  readonly price: number;

  @MinLength(3)
  @MaxLength(5000)
  readonly description: string;
}
