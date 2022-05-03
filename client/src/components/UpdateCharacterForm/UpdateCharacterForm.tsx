import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid, Typography } from "@mui/material";
import CharacterEquipmentForm from "components/CharacterEquipmentForm/CharacterEquipmentForm";
import { RouteUrls } from "config";
import { useAppDispatch, useAppSelector } from "hooks";
import UpdateCharacterDto from "models/characters/update-character.dto";
import updateCharacterValidationSchema from "models/characters/update-character.validation";
import { AvailableEquipmentItems } from "models/items/item";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { updateCharacter } from "reducers/characterSlice";

export default function UpdateCharacterForm({
  availableEquipmentItems,
}: {
  availableEquipmentItems: AvailableEquipmentItems;
}) {
  const dispatch = useAppDispatch();

  const { currentCharacter } = useAppSelector((state) => state.character);

  if (!currentCharacter) {
    return <Navigate to={RouteUrls.SelectCharacter} />;
  }

  const initialFormValues: UpdateCharacterDto = {
    equipments: {
      bodyId: currentCharacter.equipments.bodyId,
      headId: currentCharacter.equipments.headId,
      faceId: currentCharacter.equipments.faceId,
      leftArmId: currentCharacter.equipments.leftArmId,
      leftHandId: currentCharacter.equipments.leftHandId,
      leftLegId: currentCharacter.equipments.leftLegId,
      rightArmId: currentCharacter.equipments.rightArmId,
      rightHandId: currentCharacter.equipments.rightHandId,
      rightLegId: currentCharacter.equipments.rightLegId,
    },
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const methods = useForm({
    mode: "onChange",
    defaultValues: initialFormValues,
    resolver: yupResolver(updateCharacterValidationSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = (updateCharacterDto: UpdateCharacterDto) => {
    if (currentCharacter) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      dispatch(updateCharacter({ characterId: currentCharacter._id, updateCharacterDto }));
    }
  };

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <CharacterEquipmentForm availableEquipmentItems={availableEquipmentItems} />
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item>
            <Button type="submit" variant="contained">
              <Typography>Modifier</Typography>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </FormProvider>
  );
}
