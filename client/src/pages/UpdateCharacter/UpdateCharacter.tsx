import { Box, Typography } from "@mui/material";
import UpdateCharacterForm from "components/UpdateCharacterForm/UpdateCharacterForm";
import { RouteUrls } from "config";
import { useAppDispatch, useAppSelector } from "hooks";
import { AvailableEquipmentItems } from "models/items/item";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { CharacterStatus, clearState } from "reducers/characterSlice";
import inventoryService from "services/inventory.service";

export default function UpdateCharacter() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { currentCharacter, updateStatus, updateErrorMessage } = useAppSelector((state) => state.character);

  const [items, setItems] = useState<AvailableEquipmentItems | undefined>(undefined);

  useEffect(() => {
    if (!items && currentCharacter) {
      const fetchItems = async () => {
        const fetchedItems = await inventoryService.getCharacterInventory(currentCharacter._id);

        const availableItems: AvailableEquipmentItems = {
          body: [],
          face: [],
          head: [],
          leftArm: [],
          leftHand: [],
          leftLeg: [],
          rightArm: [],
          rightHand: [],
          rightLeg: [],
        };

        fetchedItems.forEach((item) => {
          availableItems[item.type].push(item);
        });

        setItems(availableItems);
      };

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      fetchItems();
    }
  }, [currentCharacter, items]);

  useEffect(() => {
    if (updateStatus === CharacterStatus.Finished) {
      dispatch(clearState());
      navigate(RouteUrls.Home);
    }
  }, [dispatch, navigate, updateStatus]);

  if (!currentCharacter) {
    return <Navigate to={RouteUrls.SelectCharacter} />;
  }

  return (
    <>
      <Box textAlign="center">
        <Typography variant="h2">Modifier le personnage</Typography>
      </Box>

      {items && items.body.length > 0 && <UpdateCharacterForm availableEquipmentItems={items} />}
      {updateErrorMessage && <Typography>{updateErrorMessage}</Typography>}
    </>
  );
}
