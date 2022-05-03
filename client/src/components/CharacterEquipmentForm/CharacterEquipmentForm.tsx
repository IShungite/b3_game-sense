import { Box, Grid, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import Character from "components/Character/Character";
import { useAppSelector } from "hooks";
import CreateCharacterDto from "models/characters/create-character.dto";
import { AvailableEquipmentItems } from "models/items/item";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import getItemImage from "utils/items";

export default function CharacterEquipmentForm({
  availableEquipmentItems,
}: {
  availableEquipmentItems: AvailableEquipmentItems;
}) {
  const { getValues, setValue } = useFormContext<{ equipments: CreateCharacterDto["equipments"] }>(); // retrieve all hook methods

  const { currentCharacter } = useAppSelector((state) => state.character);

  const categories = [
    {
      name: "Tête",
      items: availableEquipmentItems.head,
      state: useState(
        currentCharacter
          ? availableEquipmentItems.head.findIndex((item) => item._id === currentCharacter.equipments.headId)
          : 0,
      ),
    },
    {
      name: "Visage",
      items: availableEquipmentItems.face,
      state: useState(
        currentCharacter
          ? availableEquipmentItems.face.findIndex((item) => item._id === currentCharacter.equipments.faceId)
          : 0,
      ),
    },
    {
      name: "Corps",
      items: availableEquipmentItems.body,
      state: useState(
        currentCharacter
          ? availableEquipmentItems.body.findIndex((item) => item._id === currentCharacter.equipments.bodyId)
          : 0,
      ),
    },
    {
      name: "Bras gauche",
      items: availableEquipmentItems.leftArm,
      state: useState(
        currentCharacter
          ? availableEquipmentItems.leftArm.findIndex((item) => item._id === currentCharacter.equipments.leftArmId)
          : 0,
      ),
    },
    {
      name: "Main gauche",
      items: availableEquipmentItems.leftHand,
      state: useState(
        currentCharacter
          ? availableEquipmentItems.leftHand.findIndex((item) => item._id === currentCharacter.equipments.leftHandId)
          : 0,
      ),
    },
    {
      name: "Bras droit",
      items: availableEquipmentItems.rightArm,
      state: useState(
        currentCharacter
          ? availableEquipmentItems.rightArm.findIndex((item) => item._id === currentCharacter.equipments.rightArmId)
          : 0,
      ),
    },
    {
      name: "Main droite",
      items: availableEquipmentItems.rightHand,
      state: useState(
        currentCharacter
          ? availableEquipmentItems.rightHand.findIndex((item) => item._id === currentCharacter.equipments.rightHandId)
          : 0,
      ),
    },
    {
      name: "Jambe gauche",
      items: availableEquipmentItems.leftLeg,
      state: useState(
        currentCharacter
          ? availableEquipmentItems.leftLeg.findIndex((item) => item._id === currentCharacter.equipments.leftLegId)
          : 0,
      ),
    },
    {
      name: "Jambe droite",
      items: availableEquipmentItems.rightLeg,
      state: useState(
        currentCharacter
          ? availableEquipmentItems.rightLeg.findIndex((item) => item._id === currentCharacter.equipments.rightLegId)
          : 0,
      ),
    },
  ];

  return (
    <Grid container justifyContent="space-around" sx={{ mb: 2 }}>
      <Grid item>
        <Character equipments={getValues().equipments} />
      </Grid>
      <Grid item>
        {categories.map((option) => (
          <Box key={option.name}>
            <Typography>{option.name}</Typography>

            <ToggleButtonGroup
              value={option.state[0]}
              exclusive
              onChange={(_: React.MouseEvent<HTMLElement>, newItemId: number | null) => {
                if (newItemId !== null) {
                  option.state[1](newItemId);

                  // We have to manually set the value to our form
                  setValue(`equipments.${option.items[newItemId].type}Id`, option.items[newItemId]._id);
                }
              }}
            >
              {option.items.map((item, i) => (
                <ToggleButton size="small" value={i} key={item._id}>
                  <img width={30} height={30} src={getItemImage(item._id).image} alt="Button start icon" />
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
        ))}
      </Grid>
    </Grid>
  );
}
