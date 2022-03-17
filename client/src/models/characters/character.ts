export interface ICharacter {
  nickname: string;
  equipments: CharacterEquipments;
}

export interface CharacterEquipments {
  bodyId: number;
  headId: number;
  faceId: number;
  leftArmId: number;
  leftHandId: number;
  leftLegId: number;
  rightArmId: number;
  rightHandId: number;
  rightLegId: number;
}
