import { Color, Gender } from "./character";

export interface CreateCharacterDto {
  nickname: string;
  gender: Gender;
  color: Color;
}
