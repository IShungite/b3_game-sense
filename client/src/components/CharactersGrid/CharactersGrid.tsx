import { Grid, Typography } from "@mui/material";
import api from "api";
import { useAppSelector } from "hooks";
import { ICharacter } from "models/characters/character";
import React, { useEffect, useState } from "react";

export default function CharactersGrid() {
  const { currentSubject } = useAppSelector((state) => state.subject);

  const [characters, setCharacters] = useState<ICharacter[]>([]);

  useEffect(() => {
    if (characters.length === 0 && currentSubject) {
      const getCharacters = async () => {
        const charactersFetched = (await api.getCharactersFromPromotion(currentSubject.promotionId)).data;
        setCharacters(charactersFetched);
      };

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      getCharacters();
    }
  }, [characters, currentSubject]);

  return (
    <>
      <Typography variant="h5">Liste des élèves</Typography>

      <Grid container direction="column">
        {characters.map((character) => (
          <Grid item key={character._id}>
            <Typography>- {character.nickname}</Typography>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
