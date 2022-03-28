/* eslint-disable no-param-reassign */
import { ICharacter } from "models/characters/character";
import { IItem } from "models/items/item";
import React from "react";
import { Layer, Shape, Stage } from "react-konva";
import { getItem } from "utils/items";

type ItemImage = {
  img?: HTMLImageElement;
  imageName: string;
  x: number;
  y: number;
  is_loaded: boolean;
};

export type CharacterConfig = {
  body: IItem;
  head: IItem;
  face: IItem;
  leftArm: IItem;
  leftHand: IItem;
  rightArm: IItem;
  rightHand: IItem;
  leftLeg: IItem;
  rightLeg: IItem;
};

export default function Character({ character }: { character: ICharacter }) {
  const x = 50;
  const y = 150;

  const itemsImage: ItemImage[] = [
    { is_loaded: false, imageName: getItem(character.equipments.leftHandId).image ?? "", x: x + 195, y: y + 265 }, // leftHand
    { is_loaded: false, imageName: getItem(character.equipments.leftArmId).image ?? "", x: x + 189, y: y + 220 }, // leftArm
    { is_loaded: false, imageName: getItem(character.equipments.leftLegId).image ?? "", x: x + 164, y: y + 317 }, // leftLeg
    { is_loaded: false, imageName: getItem(character.equipments.rightLegId).image ?? "", x: x + 80, y: y + 317 }, // rightLeg
    { is_loaded: false, imageName: getItem(character.equipments.bodyId).image ?? "", x: x + 14, y: y + 132 }, // body
    { is_loaded: false, imageName: getItem(character.equipments.headId).image ?? "", x: x - 75, y: y - 170 }, // head
    { is_loaded: false, imageName: getItem(character.equipments.faceId).image ?? "", x: x + 58, y: y + 35 }, // face
    { is_loaded: false, imageName: getItem(character.equipments.rightHandId).image ?? "", x: x + 33, y: y + 275 }, // rightHand
    { is_loaded: false, imageName: getItem(character.equipments.rightArmId).image ?? "", x: x + 40, y: y + 220 }, // rightArm
  ];

  return (
    <Stage width={440} height={590}>
      <Layer>
        <Shape
          sceneFunc={(context) => {
            const loadImage = (itemImage: ItemImage, i: number) => {
              itemImage.img = new Image();
              itemImage.img.src = itemImage.imageName;
              itemImage.img.style.zIndex = i.toString();
              itemImage.img.onload = () => {
                itemsImage.forEach((itemImage2, j) => {
                  // Draw images ONLY when img is loaded, and when the previous one is already draw (because we cant manage the z-index)
                  if (itemImage2.img && (j === 0 || itemsImage[j - 1].is_loaded)) {
                    context.drawImage(itemImage2.img, itemImage2.x, itemImage2.y);
                    itemImage2.is_loaded = true;
                  }
                });
              };
            };

            itemsImage.forEach((itemImage, i) => {
              loadImage(itemImage, i);
            });
          }}
        />
      </Layer>
    </Stage>
  );
}
