import { Container, Grid, Typography } from "@mui/material";
import { RouteUrls } from "config";
import { useAppDispatch, useAppSelector } from "hooks";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getCharacters } from "reducers/characterSlice";

export default function Home() {
  const dispatch = useAppDispatch();

  const { user, errorMessage } = useAppSelector((state) => state.auth);

  const { characters, getAllErrorMessage } = useAppSelector((state) => state.character);

  useEffect(() => {
    if (characters.length === 0) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      dispatch(getCharacters());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <Container component="main">
      <Typography>Home</Typography>

      <Grid container direction="column">
        {characters.map((character) => (
          <Grid item key={character.nickname}>
            <Typography>{character.nickname}</Typography>
          </Grid>
        ))}
      </Grid>

      <Typography>{getAllErrorMessage}</Typography>

      {user && <Link to={RouteUrls.CreateCharacter}>Create new character</Link>}
    </Container>
  );
}
