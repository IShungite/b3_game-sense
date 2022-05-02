import { Box, Grid, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import Character from "components/Character/Character";
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

  const categories = [
    {
      name: "Tête",
      items: availableEquipmentItems.head,
      state: useState(0),
    },
    {
      name: "Visage",
      items: availableEquipmentItems.face,
      state: useState(0),
    },
    {
      name: "Corps",
      items: availableEquipmentItems.body,
      state: useState(0),
    },
    {
      name: "Bras gauche",
      items: availableEquipmentItems.leftArm,
      state: useState(0),
    },
    {
      name: "Main gauche",
      items: availableEquipmentItems.leftHand,
      state: useState(0),
    },
    {
      name: "Bras droit",
      items: availableEquipmentItems.rightArm,
      state: useState(0),
    },
    {
      name: "Main droite",
      items: availableEquipmentItems.rightHand,
      state: useState(0),
    },
    {
      name: "Jambe gauche",
      items: availableEquipmentItems.leftLeg,
      state: useState(0),
    },
    {
      name: "Jambe droite",
      items: availableEquipmentItems.rightLeg,
      state: useState(0),
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
