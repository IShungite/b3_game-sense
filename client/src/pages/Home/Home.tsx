import { Box, Typography } from "@mui/material";
import Character from "components/Character/Character";
import CharacterForm from "components/CharacterForm.tsx/CharacterForm";
import QuizzesGridStudent from "components/QuizzesGridStudent/QuizzesGridStudent";
import { RouteUrls } from "config";
import { useAppSelector } from "hooks";
import { IStarterItems } from "models/items/item";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";

export default function Home() {
  const { currentCharacter } = useAppSelector((state) => state.character);

  const [items, setItems] = useState<IStarterItems | undefined>();

  if (!currentCharacter) {
    return <Navigate to={RouteUrls.SelectCharacter} />;
  }

  // useEffect(() => {
  //   if (!items) {
  //     const fetchItems = async () => {
  //       const fetchedItems = (await inventoryService.getCharacterInventory()).data;

  //       setItems(fetchedItems);
  //     };
  //   }
  // }, []);

  return (
    <>
      <Box textAlign="center">
        <Typography variant="h2">Home</Typography>
      </Box>

      <Typography variant="h4">{currentCharacter.nickname}</Typography>

      <Character equipments={currentCharacter.equipments} />

      <QuizzesGridStudent />

      {items && <CharacterForm starterItems={items} />}
    </>
  );
}
