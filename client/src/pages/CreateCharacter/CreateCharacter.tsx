import { Box, Container, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import Character, { CharacterConfig } from "components/Character/Character";
import { IItem } from "models/items/item";
import React, { useState } from "react";
import { getFreeCharacterItems } from "utils/items";

const freeItems = getFreeCharacterItems();

export default function CreateCharacter() {
  const initialCharacterConfig: CharacterConfig = {
    body: freeItems.bodies[0],
    head: freeItems.heads[0],
    face: freeItems.faces[0],
    leftArm: freeItems.leftArms[0],
    leftHand: freeItems.leftHands[0],
    leftLeg: freeItems.leftLegs[0],
    rightArm: freeItems.rightArms[0],
    rightHand: freeItems.rightHands[0],
    rightLeg: freeItems.rightLegs[0],
  };

  const [characterConfig, setCharacterConfig] = useState(initialCharacterConfig);

  const options = [
    {
      name: "Head",
      items: freeItems.heads,
      onClick: (item: IItem) => setCharacterConfig({ ...characterConfig, head: item }),
      state: useState(0),
    },
    {
      name: "Face",
      items: freeItems.faces,
      onClick: (item: IItem) => setCharacterConfig({ ...characterConfig, face: item }),
      state: useState(0),
    },
    {
      name: "Body",
      items: freeItems.bodies,
      onClick: (item: IItem) => setCharacterConfig({ ...characterConfig, body: item }),
      state: useState(0),
    },
    {
      name: "Left Arm",
      items: freeItems.leftArms,
      onClick: (item: IItem) => setCharacterConfig({ ...characterConfig, leftArm: item }),
      state: useState(0),
    },
    {
      name: "Left Hand",
      items: freeItems.leftHands,
      onClick: (item: IItem) => setCharacterConfig({ ...characterConfig, leftHand: item }),
      state: useState(0),
    },
    {
      name: "Right Arm",
      items: freeItems.rightArms,
      onClick: (item: IItem) => setCharacterConfig({ ...characterConfig, rightArm: item }),
      state: useState(0),
    },
    {
      name: "Right Hand",
      items: freeItems.rightHands,
      onClick: (item: IItem) => setCharacterConfig({ ...characterConfig, rightHand: item }),
      state: useState(0),
    },
    {
      name: "Left Leg",
      items: freeItems.leftLegs,
      onClick: (item: IItem) => setCharacterConfig({ ...characterConfig, leftLeg: item }),
      state: useState(0),
    },
    {
      name: "Right Leg",
      items: freeItems.rightLegs,
      onClick: (item: IItem) => setCharacterConfig({ ...characterConfig, rightLeg: item }),
      state: useState(0),
    },
  ];

  return (
    <Container component="main">
      <Typography>Create character</Typography>

      <Box display="flex" justifyContent="space-around">
        <Character config={characterConfig} />
        <Box>
          {options.map((option) => (
            <Box key={option.name}>
              <Typography>{option.name}</Typography>

              <ToggleButtonGroup
                value={option.state[0]}
                exclusive
                onChange={(_: React.MouseEvent<HTMLElement>, newItemId: number | null) => {
                  if (newItemId !== null) {
                    option.state[1](newItemId);
                    option.onClick(option.items[newItemId]);
                  }
                }}
              >
                {option.items.map((item, i) => (
                  <ToggleButton size="small" value={i} key={item.id}>
                    <img width={30} height={30} src={item.image} alt="Button start icon" />
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
