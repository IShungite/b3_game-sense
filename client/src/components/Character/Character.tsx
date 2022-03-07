/* eslint-disable no-param-reassign */
/* eslint-disable import/no-named-default */
import React from "react";
import { Layer, Shape, Stage } from "react-konva";
import hairs from "./hairs";
import heads from "./heads";
import legs from "./legs";
import torsos from "./torsos";

type ImageInfo = {
  index: string;
  img?: HTMLImageElement;
  imageName: string;
  x: number;
  y: number;
};

export default function Character() {
  const x = 50;
  const y = 150;

  const images: ImageInfo[] = [
    { index: "legs", imageName: legs[1], x, y },
    { index: "torso", imageName: torsos[1], x, y: y - 50 },
    { index: "head", imageName: heads[2], x: x - 10, y: y - 125 },
    { index: "hair", imageName: hairs[1], x: x - 37, y: y - 138 },
  ];

  return (
    <Stage width={150} height={185}>
      <Layer>
        <Shape
          sceneFunc={(context) => {
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
