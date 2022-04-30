import { Box, Typography } from "@mui/material";
import CharacterForm from "components/Character/CharacterForm";
import { useAppDispatch } from "hooks";
import { IStarterItems } from "models/items/item";
import React, { useEffect, useState } from "react";
import { clearState } from "reducers/characterSlice";
import itemService from "services/item.service";

export default function CreateCharacter() {
  const dispatch = useAppDispatch();

  const [starterItems, setStarterItems] = useState<IStarterItems | undefined>(undefined);

  useEffect(() => {
    async function fetchStarterItems() {
      const fetchedStarterItems = await itemService.getItems();
      if (!fetchedStarterItems) return;
      setStarterItems(fetchedStarterItems);
    }
    if (!starterItems) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      fetchStarterItems();
    }
  }, [starterItems]);

  // Clear Character state when component is unmounted
  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, [dispatch]);

  if (!starterItems) return <Typography>Loading...</Typography>;

  return (
    <>
      <Box textAlign="center">
        <Typography variant="h2" gutterBottom>
          Nouveau personnage
        </Typography>
      </Box>

      <CharacterForm starterItems={starterItems} />
    </>
  );
}
