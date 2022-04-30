export interface ICharacter {
  nickname: string;
  equipments: CharacterEquipments;
}

export interface CharacterEquipments {
  bodyId: string;
  headId: string;
  faceId: string;
  leftArmId: string;
  leftHandId: string;
  leftLegId: string;
  rightArmId: string;
  rightHandId: string;
  rightLegId: string;
}
