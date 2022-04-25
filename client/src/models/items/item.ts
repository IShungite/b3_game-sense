export interface IItem {
  id: number;
  name: string;
  description: string;
  image: string;
  type: ItemType;
  isStarter: boolean;
}

export interface IStarterItems {
  bodies: IItem[],
  faces: IItem[],
  heads: IItem[],
  leftArms: IItem[],
  leftHands: IItem[],
  leftLegs: IItem[],
  rightArms: IItem[],
  rightHands: IItem[],
  rightLegs: IItem[],
}

export type ItemType = "body" | "face" | "leftArm" | "leftHand" | "leftLeg" | "rightArm" | "rightHand" | "rightLeg";
