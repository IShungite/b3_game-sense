import { MinLength, MaxLength, IsEmail } from "class-validator";

export class CreateUserDto {
  @MinLength(3)
  @MaxLength(15)
  readonly first_name: string;

  @MinLength(3)
  @MaxLength(15)
  readonly last_name: string;

  @IsEmail()
  readonly email: string;

  @MinLength(5)
  @MaxLength(15)
  readonly password: string;
}
