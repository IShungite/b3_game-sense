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
