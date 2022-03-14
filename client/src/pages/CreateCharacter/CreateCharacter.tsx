import { Box, Container, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import bodies from "components/Character/bodies";
import Character, { CharacterConfig } from "components/Character/Character";
import faces from "components/Character/faces";
import heads from "components/Character/heads";
import leftArms from "components/Character/leftArms";
import leftHands from "components/Character/leftHands";
import leftLegs from "components/Character/leftLegs";
import rightArms from "components/Character/rightArms";
import rightHands from "components/Character/rightHands";
import rightLegs from "components/Character/rightLegs";
import React, { useState } from "react";

export default function CreateCharacter() {
  const initialCharacterConfig: CharacterConfig = {
    bodyImg: bodies[0],
    headImg: heads[0],
    faceImg: faces[0],
    leftArmImg: leftArms[0],
    leftHandImg: leftHands[0],
    rightArmImg: rightArms[0],
    rightHandImg: rightHands[0],
    leftLegImg: leftLegs[0],
    rightLegImg: rightLegs[0],
  };

  const [characterConfig, setCharacterConfig] = useState(initialCharacterConfig);

  const options = [
    {
      name: "Head",
      images: heads,
      onClick: (img: string) => setCharacterConfig({ ...characterConfig, headImg: img }),
      state: useState(0),
    },
    {
      name: "Face",
      images: faces,
      onClick: (img: string) => setCharacterConfig({ ...characterConfig, faceImg: img }),
      state: useState(0),
    },
    {
      name: "Body",
      images: bodies,
      onClick: (img: string) => setCharacterConfig({ ...characterConfig, bodyImg: img }),
      state: useState(0),
    },
    {
      name: "Left Arm",
      images: leftArms,
      onClick: (img: string) => setCharacterConfig({ ...characterConfig, leftArmImg: img }),
      state: useState(0),
    },
    {
      name: "Left Hand",
      images: leftHands,
      onClick: (img: string) => setCharacterConfig({ ...characterConfig, leftHandImg: img }),
      state: useState(0),
    },
    {
      name: "Right Arm",
      images: rightArms,
      onClick: (img: string) => setCharacterConfig({ ...characterConfig, rightArmImg: img }),
      state: useState(0),
    },
    {
      name: "Right Hand",
      images: rightHands,
      onClick: (img: string) => setCharacterConfig({ ...characterConfig, rightHandImg: img }),
      state: useState(0),
    },
    {
      name: "Left Leg",
      images: leftLegs,
      onClick: (img: string) => setCharacterConfig({ ...characterConfig, leftLegImg: img }),
      state: useState(0),
    },
    {
      name: "Right Leg",
      images: rightLegs,
      onClick: (img: string) => setCharacterConfig({ ...characterConfig, rightLegImg: img }),
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
                onChange={(event: React.MouseEvent<HTMLElement>, newImg: number | null) => {
                  if (newImg !== null) {
                    option.state[1](newImg);
                    option.onClick(option.images[newImg]);
                  }
                }}
              >
                {option.images.map((image, i) => (
                  <ToggleButton size="small" value={i} key={image}>
                    <img width={30} height={30} src={image} alt="Button start icon" />
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
