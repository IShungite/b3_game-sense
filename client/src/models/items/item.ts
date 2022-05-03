export interface IItem {
  _id: string;
  name: string;
  description: string;
  image: string;
  type: ItemType;
  isStarter: boolean;
}

export interface IItemImage {
  id: string;
  image: string;
}

export type AvailableEquipmentItems = {
  body: IItem[];
  head: IItem[];
  face: IItem[];
  leftArm: IItem[];
  leftHand: IItem[];
  rightArm: IItem[];
  rightHand: IItem[];
  leftLeg: IItem[];
  rightLeg: IItem[];
};

export type ItemType = "body" | "face" | "leftArm" | "leftHand" | "leftLeg" | "rightArm" | "rightHand" | "rightLeg";
