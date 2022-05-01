export interface IItem {
  id: number;
  name: string;
  description: string;
  image: string;
  type: ItemType;
}

export type ItemType = "body" | "face" | "leftArm" | "leftHand" | "leftLeg" | "rightArm" | "rightHand" | "rightLeg";
