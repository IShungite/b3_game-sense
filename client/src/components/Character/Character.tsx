/* eslint-disable no-param-reassign */
import React from "react";
import { Layer, Shape, Stage } from "react-konva";

type ImageInfo = {
  index: string;
  img?: HTMLImageElement;
  imageName: string;
  x: number;
  y: number;
};

export type CharacterConfig = {
  bodyImg: string;
  headImg: string;
  faceImg: string;
  leftArmImg: string;
  leftHandImg: string;
  rightArmImg: string;
  rightHandImg: string;
  leftLegImg: string;
  rightLegImg: string;
};

export default function Character({ config }: { config: CharacterConfig }) {
  const x = 50;
  const y = 150;

  const images: ImageInfo[] = [
    { index: "left_hand", imageName: config.leftHandImg, x: x + 195, y: y + 265 },
    { index: "left_arm", imageName: config.leftArmImg, x: x + 189, y: y + 220 },
    { index: "left_leg", imageName: config.leftLegImg, x: x + 164, y: y + 317 },
    { index: "right_leg", imageName: config.rightLegImg, x: x + 80, y: y + 317 },
    { index: "body", imageName: config.bodyImg, x: x + 14, y: y + 132 },
    { index: "head", imageName: config.headImg, x: x - 75, y: y - 170 },
    { index: "face", imageName: config.faceImg, x: x + 58, y: y + 35 },
    { index: "right_hand", imageName: config.rightHandImg, x: x + 33, y: y + 275 },
    { index: "right_arm", imageName: config.rightArmImg, x: x + 40, y: y + 220 },
  ];

  return (
    <Stage width={440} height={590}>
      <Layer>
        <Shape
          sceneFunc={(context) => {
            // TODO: Find a better way to display the character
            const loadImage = (imageInfo: ImageInfo) => {
              imageInfo.img = new Image();
              imageInfo.img.src = imageInfo.imageName;

              imageInfo.img.onload = () => {
                if (imageInfo.img) {
                  context.drawImage(imageInfo.img, imageInfo.x, imageInfo.y);
                }
              };
            };

            images.forEach((imageInfo) => {
              loadImage(imageInfo);
            });
          }}
        />
      </Layer>
    </Stage>
  );
}
