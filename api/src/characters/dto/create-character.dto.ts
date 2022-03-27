import { CharacterEquipments } from "../schemas/character.schema";

export class CreateCharacterDto {
  readonly nickname: string;
  readonly equipments: CharacterEquipments;
}
