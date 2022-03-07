export class CreateCharacterDto {
  readonly nickname: string;
  readonly gender: Gender;
}

export enum Gender {
  Male,
  Female,
}
