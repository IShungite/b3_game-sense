export interface ICharacter {
  nickname: string;
  gender: Gender;
  color: Color;
}

export enum Gender {
  Male,
  Female,
}

export enum Color {
  White,
  Black,
}
