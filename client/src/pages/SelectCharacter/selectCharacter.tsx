import { Box, Button, Grid, Typography } from "@mui/material";
import { RouteUrls } from "config";
import { useAppDispatch, useAppSelector } from "hooks";
import { ICharacter } from "models/characters/character";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCharacters, setCurrentCharacter } from "reducers/characterSlice";

export default function SelectCharacter() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { characters, getAllErrorMessage } = useAppSelector((state) => state.character);

  useEffect(() => {
    if (characters.length === 0) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      dispatch(getCharacters());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleSelectCharacter = (character: ICharacter) => {
    dispatch(setCurrentCharacter(character));
    navigate(RouteUrls.Home);
  };

  return (
    <>
      <Box textAlign="center">
        <Typography variant="h2">Selection du personnage</Typography>
      </Box>

      <Typography>Mes personnages</Typography>
      <Typography>{getAllErrorMessage}</Typography>

      <Grid container direction="column">
        {characters.map((character) => (
          <Grid item key={character.nickname} onClick={() => handleSelectCharacter(character)}>
            <Button>{character.nickname}</Button>
          </Grid>
        ))}
      </Grid>

      <Link to={RouteUrls.CreateCharacter}>Nouveau personnage</Link>
    </>
  );
}
