/* eslint-disable no-param-reassign */
import { CharacterEquipments } from "models/characters/character";
import React from "react";
import { Layer, Shape, Stage } from "react-konva";
import getItemImage from "utils/items";

type ItemImage = {
  img?: HTMLImageElement;
  imageName: string;
  x: number;
  y: number;
  is_loaded: boolean;
};

export default function Character({ equipments }: { equipments: CharacterEquipments }) {
  const x = 50;
  const y = 150;

  const itemsImage: ItemImage[] = [
    { is_loaded: false, imageName: getItemImage(equipments.leftHandId).image, x: x + 195, y: y + 265 }, // leftHand
    { is_loaded: false, imageName: getItemImage(equipments.leftArmId).image, x: x + 189, y: y + 220 }, // leftArm
    { is_loaded: false, imageName: getItemImage(equipments.leftLegId).image, x: x + 164, y: y + 317 }, // leftLeg
    { is_loaded: false, imageName: getItemImage(equipments.rightLegId).image, x: x + 80, y: y + 317 }, // rightLeg
    { is_loaded: false, imageName: getItemImage(equipments.bodyId).image, x: x + 14, y: y + 132 }, // body
    { is_loaded: false, imageName: getItemImage(equipments.headId).image, x: x - 75, y: y - 170 }, // head
    { is_loaded: false, imageName: getItemImage(equipments.faceId).image, x: x + 58, y: y + 35 }, // face
    { is_loaded: false, imageName: getItemImage(equipments.rightHandId).image, x: x + 33, y: y + 275 }, // rightHand
    { is_loaded: false, imageName: getItemImage(equipments.rightArmId).image, x: x + 40, y: y + 220 }, // rightArm
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
