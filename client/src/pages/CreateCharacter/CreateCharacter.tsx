import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Container, Grid, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import Character, { CharacterConfig } from "components/Character/Character";
import CreateCharacterDto from "models/characters/create-character.dto";
import createCharacterValidationSchema from "models/characters/create-character.validation";
import { IItem } from "models/items/item";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { getFreeCharacterItems } from "utils/items";

const freeItems = getFreeCharacterItems();

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

export default function CreateCharacter() {
  const [characterConfig, setCharacterConfig] = useState(initialCharacterConfig);

  const categories = [
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

  const initialFormValues: CreateCharacterDto = {
    nickname: "",
    equipments: {
      bodyId: characterConfig.body.id,
      headId: characterConfig.head.id,
      faceId: characterConfig.face.id,
      leftArmId: characterConfig.leftArm.id,
      leftHandId: characterConfig.leftHand.id,
      leftLegId: characterConfig.leftLeg.id,
      rightArmId: characterConfig.rightArm.id,
      rightHandId: characterConfig.rightHand.id,
      rightLegId: characterConfig.rightLeg.id,
    },
  };

  const {
    register: registerFormField,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: initialFormValues,
    resolver: yupResolver(createCharacterValidationSchema),
  });

  const onSubmit = (data: CreateCharacterDto) => {
    console.log(data);
  };

  return (
    <Container component="main">
      <Box textAlign="center">
        <Typography variant="h2" gutterBottom>
          Nouveau personnage
        </Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container justifyContent="space-around" sx={{ mb: 2 }}>
          <Grid item>
            <Character config={characterConfig} />
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
                      option.onClick(option.items[newItemId]);

                      // We have to manually set the value to our form
                      setValue(`equipments.${option.items[newItemId].type}Id`, option.items[newItemId].id);
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

        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item>
            <TextField
              label="Nom"
              variant="outlined"
              type="nickname"
              error={Boolean(errors.nickname)}
              defaultValue={initialFormValues.nickname}
              helperText={errors.nickname?.message}
              {...registerFormField("nickname")}
            />
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained">
              <Typography>Créer</Typography>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
