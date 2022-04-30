import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { RouteUrls } from "config";
import { useAppDispatch, useAppSelector } from "hooks";
import CreateCharacterDto from "models/characters/create-character.dto";
import createCharacterValidationSchema from "models/characters/create-character.validation";
import { IItem, IStarterItems } from "models/items/item";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CharacterStatus, createCharacter } from "reducers/characterSlice";
import getItemImage from "utils/items";
import Character, { CharacterConfig } from "./Character";

interface Props {
  starterItems: IStarterItems;
}

export default function CharacterForm({ starterItems }: Props) {
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const navigate = useNavigate();

  const initialCharacterConfig: CharacterConfig = {
    body: starterItems.body[0],
    head: starterItems.head[0],
    face: starterItems.face[0],
    leftArm: starterItems.leftArm[0],
    leftHand: starterItems.leftHand[0],
    leftLeg: starterItems.leftLeg[0],
    rightArm: starterItems.rightArm[0],
    rightHand: starterItems.rightHand[0],
    rightLeg: starterItems.rightLeg[0],
  };

  const [characterConfig, setCharacterConfig] = useState(initialCharacterConfig);

  const { createStatus, createErrorMessage } = useAppSelector((state) => state.character);

  const categories = [
    {
      name: "Tête",
      items: starterItems.head,
      onClick: (item: IItem) => setCharacterConfig({ ...characterConfig, head: item }),
      state: useState(0),
    },
    {
      name: "Visage",
      items: starterItems.face,
      onClick: (item: IItem) => setCharacterConfig({ ...characterConfig, face: item }),
      state: useState(0),
    },
    {
      name: "Corps",
      items: starterItems.body,
      onClick: (item: IItem) => setCharacterConfig({ ...characterConfig, body: item }),
      state: useState(0),
    },
    {
      name: "Bras gauche",
      items: starterItems.leftArm,
      onClick: (item: IItem) => setCharacterConfig({ ...characterConfig, leftArm: item }),
      state: useState(0),
    },
    {
      name: "Main gauche",
      items: starterItems.leftHand,
      onClick: (item: IItem) => setCharacterConfig({ ...characterConfig, leftHand: item }),
      state: useState(0),
    },
    {
      name: "Bras droit",
      items: starterItems.rightArm,
      onClick: (item: IItem) => setCharacterConfig({ ...characterConfig, rightArm: item }),
      state: useState(0),
    },
    {
      name: "Main droite",
      items: starterItems.rightHand,
      onClick: (item: IItem) => setCharacterConfig({ ...characterConfig, rightHand: item }),
      state: useState(0),
    },
    {
      name: "Jambe gauche",
      items: starterItems.leftLeg,
      onClick: (item: IItem) => setCharacterConfig({ ...characterConfig, leftLeg: item }),
      state: useState(0),
    },
    {
      name: "Jambe droite",
      items: starterItems.rightLeg,
      onClick: (item: IItem) => setCharacterConfig({ ...characterConfig, rightLeg: item }),
      state: useState(0),
    },
  ];

  const initialFormValues: CreateCharacterDto = {
    nickname: "",
    equipments: {
      bodyId: characterConfig.body._id,
      headId: characterConfig.head._id,
      faceId: characterConfig.face._id,
      leftArmId: characterConfig.leftArm._id,
      leftHandId: characterConfig.leftHand._id,
      leftLegId: characterConfig.leftLeg._id,
      rightArmId: characterConfig.rightArm._id,
      rightHandId: characterConfig.rightHand._id,
      rightLegId: characterConfig.rightLeg._id,
    },
  };

  const {
    register: registerFormField,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: initialFormValues,
    resolver: yupResolver(createCharacterValidationSchema),
  });

  const onSubmit = (data: CreateCharacterDto) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(createCharacter(data));
  };

  // If the character is successfully created, redirect to the home
  useEffect(() => {
    if (createStatus === CharacterStatus.Finished) navigate(RouteUrls.Home);
  }, [createStatus, navigate]);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container justifyContent="space-around" sx={{ mb: 2 }}>
        <Grid item>
          <Character character={getValues()} />
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
      <Typography>{createErrorMessage}</Typography>
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
  );
}
