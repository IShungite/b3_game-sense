import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import api from "api";
import { AppSelect } from "components/AppSelect/AppSelect";
import CharacterEquipmentForm from "components/CharacterEquipmentForm/CharacterEquipmentForm";
import { RouteUrls } from "config";
import { useAppDispatch, useAppSelector } from "hooks";
import CreateCharacterDto from "models/characters/create-character.dto";
import createCharacterValidationSchema from "models/characters/create-character.validation";
import { AvailableEquipmentItems, IItem } from "models/items/item";
import { IPromotion } from "models/promotions/promotion";
import { ISchool } from "models/schools/school";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CharacterStatus, clearState, createCharacter } from "reducers/characterSlice";

export type CharacterConfig = {
  body: IItem;
  head: IItem;
  face: IItem;
  leftArm: IItem;
  leftHand: IItem;
  rightArm: IItem;
  rightHand: IItem;
  leftLeg: IItem;
  rightLeg: IItem;
};

interface Props {
  starterItems: AvailableEquipmentItems;
}

type SchoolIdType = { label: string; value: string };
type PromotionIdType = { label: string; value: string };

export default function CreateCharacterForm({ starterItems }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [schools, setSchools] = useState<ISchool[]>([]);
  const [promotions, setPromotions] = useState<IPromotion[]>([]);

  const { createStatus, createErrorMessage } = useAppSelector((state) => state.character);

  const initialFormValues: CreateCharacterDto = {
    nickname: "",
    equipments: {
      bodyId: starterItems.body[0]._id,
      headId: starterItems.head[0]._id,
      faceId: starterItems.face[0]._id,
      leftArmId: starterItems.leftArm[0]._id,
      leftHandId: starterItems.leftHand[0]._id,
      leftLegId: starterItems.leftLeg[0]._id,
      rightArmId: starterItems.rightArm[0]._id,
      rightHandId: starterItems.rightHand[0]._id,
      rightLegId: starterItems.rightLeg[0]._id,
    },
    schoolId: "",
    promotionId: "",
  };

  const methods = useForm({
    mode: "onChange",
    defaultValues: initialFormValues,
    resolver: yupResolver(createCharacterValidationSchema),
  });

  const {
    register: registerFormField,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = methods;

  const schoolIdWatched = watch("schoolId");

  const onSubmit = (data: CreateCharacterDto) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(createCharacter(data));
  };

  useEffect(
    () => () => {
      dispatch(clearState());
    },
    [dispatch],
  );

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
    <FormProvider {...methods}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <CharacterEquipmentForm availableEquipmentItems={starterItems} />
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
            <AppSelect<CreateCharacterDto, PromotionIdType[]>
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
    </FormProvider>
  );
}
