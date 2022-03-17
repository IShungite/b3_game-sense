import { IItem } from "models/items/item";
import jsonItems from "../../public/items.json";

const items = jsonItems as unknown as IItem[];

export const getAllItems = (): IItem[] => items;

export const getFreeCharacterItems = () => ({
  bodies: [items[1], items[12], items[23]],
  faces: [items[2], items[3], items[4], items[13], items[14], items[15], items[24], items[25], items[26]],
  heads: [items[5], items[16], items[27]],
  leftArms: [items[6], items[17], items[28]],
  leftHands: [items[7], items[18], items[29]],
  leftLegs: [items[8], items[19], items[30]],
  rightArms: [items[9], items[20], items[31]],
  rightHands: [items[10], items[21], items[32]],
  rightLegs: [items[11], items[22], items[33]],
});
