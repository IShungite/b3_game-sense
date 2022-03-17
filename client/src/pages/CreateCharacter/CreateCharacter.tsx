import { Box, Button, Container, Grid, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
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
      name: "Tête",
      items: freeItems.heads,
      onClick: (item: IItem) => setCharacterConfig({ ...characterConfig, head: item }),
      state: useState(0),
    },
    {
      name: "Visage",
      items: freeItems.faces,
      onClick: (item: IItem) => setCharacterConfig({ ...characterConfig, face: item }),
      state: useState(0),
    },
    {
      name: "Corps",
      items: freeItems.bodies,
      onClick: (item: IItem) => setCharacterConfig({ ...characterConfig, body: item }),
      state: useState(0),
    },
    {
      name: "Bras gauche",
      items: freeItems.leftArms,
      onClick: (item: IItem) => setCharacterConfig({ ...characterConfig, leftArm: item }),
      state: useState(0),
    },
    {
      name: "Main gauche",
      items: freeItems.leftHands,
      onClick: (item: IItem) => setCharacterConfig({ ...characterConfig, leftHand: item }),
      state: useState(0),
    },
    {
      name: "Bras droit",
      items: freeItems.rightArms,
      onClick: (item: IItem) => setCharacterConfig({ ...characterConfig, rightArm: item }),
      state: useState(0),
    },
    {
      name: "Main droite",
      items: freeItems.rightHands,
      onClick: (item: IItem) => setCharacterConfig({ ...characterConfig, rightHand: item }),
      state: useState(0),
    },
    {
      name: "Jambe gauche",
      items: freeItems.leftLegs,
      onClick: (item: IItem) => setCharacterConfig({ ...characterConfig, leftLeg: item }),
      state: useState(0),
    },
    {
      name: "Jambe droite",
      items: freeItems.rightLegs,
      onClick: (item: IItem) => setCharacterConfig({ ...characterConfig, rightLeg: item }),
      state: useState(0),
    },
  ];

  return (
    <Container component="main">
      <Box textAlign="center">
        <Typography variant="h2" gutterBottom>
          Nouveau personnage
        </Typography>
      </Box>

      <Grid container justifyContent="space-around">
        <Grid item>
          <Character config={characterConfig} />
        </Grid>
        <Grid item>
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
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ mt: 1 }}>
        <Grid item>
          <TextField id="demo-helper-text-aligned-no-helper" label="Nom" />
        </Grid>
        <Grid item>
          <Button variant="contained">
            <Typography>Créer</Typography>
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
