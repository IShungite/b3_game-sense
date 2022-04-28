export interface ICharacter {
  _id: string;
  nickname: string;
  equipments: CharacterEquipments;
  promotionId: string;
  schoolId: string;
  gold: number;
  experience: number;
  level: number;
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
