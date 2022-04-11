import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import api from "api";
import { AppSelect } from "components/AppSelect/AppSelect";
import Character, { CharacterConfig } from "components/Character/Character";
import { RouteUrls } from "config";
import { useAppDispatch, useAppSelector } from "hooks";
import CreateCharacterDto from "models/characters/create-character.dto";
import createCharacterValidationSchema from "models/characters/create-character.validation";
import { IItem } from "models/items/item";
import { IPromotion } from "models/promotions/promotion";
import { ISchool } from "models/schools/school";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CharacterStatus, clearState, createCharacter } from "reducers/characterSlice";
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

type SchoolIdType = { label: string; value: string };
type PromotionIdType = { label: string; value: string };

export default function CreateCharacter() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { createStatus, createErrorMessage } = useAppSelector((state) => state.character);

  const [characterConfig, setCharacterConfig] = useState(initialCharacterConfig);

  const [schools, setSchools] = useState<ISchool[]>([]);
  const [promotions, setPromotions] = useState<IPromotion[]>([]);

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
    schoolId: "",
    promotionId: "",
  };

  const {
    register: registerFormField,
    handleSubmit,
    setValue,
    getValues,
    control,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: initialFormValues,
    resolver: yupResolver(createCharacterValidationSchema),
  });

  const schoolIdWatched = watch("schoolId");

  const onSubmit = (data: CreateCharacterDto) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(createCharacter(data));
  };

  // Clear Character state when component is unmounted
  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, [dispatch]);

  // If the character is successfully created, redirect to the home
  useEffect(() => {
    if (createStatus === CharacterStatus.Finished) navigate(RouteUrls.Home);
  }, [createStatus, navigate]);

  useEffect(() => {
    const fetchSchools = async () => {
      const schoolsFetched = (await api.getSchools()).data;
      setSchools(schoolsFetched);
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchSchools();
  }, []);

  useEffect(() => {
    if (schoolIdWatched) {
      const fetchPromotions = async () => {
        const promotionsFetched = (await api.getPromotions(schoolIdWatched)).data;
        setPromotions(promotionsFetched);
        setValue("promotionId", "");
      };

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      fetchPromotions();
    }
  }, [schoolIdWatched, setValue]);

  return (
    <>
      <Box textAlign="center">
        <Typography variant="h2" gutterBottom>
          Nouveau personnage
        </Typography>
      </Box>

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
          <Grid item sx={{ width: 200 }}>
            <AppSelect<CreateCharacterDto, SchoolIdType[]>
              name="schoolId"
              label="École"
              control={control}
              options={schools.map((school) => ({
                label: school.name,
                value: school._id,
              }))}
              defaultValue=""
            />
          </Grid>
          <Grid item sx={{ width: 200 }}>
            <AppSelect<CreateCharacterDto, SchoolIdType[]>
              name="promotionId"
              label="Classe"
              disabled={!schoolIdWatched}
              control={control}
              options={promotions.map((promotion) => ({
                label: promotion.name,
                value: promotion._id,
              }))}
              defaultValue=""
            />
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained">
              <Typography>Créer</Typography>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
