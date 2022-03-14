import { MaxLength, MinLength } from "class-validator";

export class CreateShopDto {
  @MinLength(3)
  @MaxLength(15)
  readonly name: string;
}
