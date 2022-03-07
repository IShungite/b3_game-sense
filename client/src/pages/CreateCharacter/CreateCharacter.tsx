import { Container, Typography } from "@mui/material";
import Character from "components/Character/Character";
// import Character from "components/Character/Character-";
import { Character as CharacterDto, Color, Gender } from "models/characters/character";
import React, { useState } from "react";

export default function CreateCharacter() {
  const initialCharacter: CharacterDto = {
    nickname: "",
    gender: Gender.Male,
    color: Color.White,
  };

  const [character, setCharacter] = useState(initialCharacter);

  return (
    <Container component="main">
      <Typography>Create character</Typography>

      <Character />
    </Container>
  );
}
