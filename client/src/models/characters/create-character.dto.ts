import { CharacterEquipments } from "./character";

export default interface CreateCharacterDto {
  nickname: string;
  equipments: CharacterEquipments;
}
