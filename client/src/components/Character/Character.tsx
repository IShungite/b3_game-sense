/* eslint-disable no-param-reassign */
import { IItem } from "models/items/item";
import React from "react";
import { Layer, Shape, Stage } from "react-konva";

type ItemImage = {
  img?: HTMLImageElement;
  imageName: string;
  x: number;
  y: number;
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

export default function Character({ config }: { config: CharacterConfig }) {
  const x = 50;
  const y = 150;

  const itemsImage: ItemImage[] = [
    { imageName: config.leftHand.image, x: x + 195, y: y + 265 }, // leftHand
    { imageName: config.leftArm.image, x: x + 189, y: y + 220 }, // leftArm
    { imageName: config.leftLeg.image, x: x + 164, y: y + 317 }, // leftLeg
    { imageName: config.rightLeg.image, x: x + 80, y: y + 317 }, // rightLeg
    { imageName: config.body.image, x: x + 14, y: y + 132 }, // body
    { imageName: config.head.image, x: x - 75, y: y - 170 }, // head
    { imageName: config.face.image, x: x + 58, y: y + 35 }, // face
    { imageName: config.rightHand.image, x: x + 33, y: y + 275 }, // rightHand
    { imageName: config.rightArm.image, x: x + 40, y: y + 220 }, // rightArm
  ];

  itemsImage.forEach((itemImage) => {
    itemImage.img = new Image();
    itemImage.img.src = itemImage.imageName;
  });

  return (
    <Stage width={440} height={590}>
      <Layer>
        <Shape
          sceneFunc={(context) => {
            const drawImage = (itemImage: ItemImage) => {
              if (itemImage.img) {
                context.drawImage(itemImage.img, itemImage.x, itemImage.y);
              }
            };

            itemsImage.forEach((itemImage) => {
              drawImage(itemImage);
            });
          }}
        />
      </Layer>
    </Stage>
  );
}
