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

export interface IStarterItems {
  body: IItem[];
  face: IItem[];
  head: IItem[];
  leftArm: IItem[];
  leftHand: IItem[];
  leftLeg: IItem[];
  rightArm: IItem[];
  rightHand: IItem[];
  rightLeg: IItem[];
}

export type ItemType = "body" | "face" | "leftArm" | "leftHand" | "leftLeg" | "rightArm" | "rightHand" | "rightLeg";
