import { Box, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "hooks";
import React, { useEffect } from "react";
import { buyProduct, CharacterStatus, clearState } from "reducers/characterSlice";
import getItemImage from "utils/items";

type Props = { name: string; id: string; itemId: string; price: number; description: string };

export default function Product({ name, id, itemId, price, description }: Props) {
  const imageSrc = getItemImage(itemId);
  const dispatch = useAppDispatch();
  const { currentCharacter, itemErrorMessage, itemStatus } = useAppSelector((state) => state.character);

  const data = {
    characterId: currentCharacter?._id ?? "",
    productId: id,
  };

  function buy() {
    if (!currentCharacter) return;

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(buyProduct(data));
  }

  useEffect(() => {
    if (itemStatus === CharacterStatus.Finished) {
      dispatch(clearState());
    }
  }, [dispatch, itemStatus]);

  useEffect(
    () => () => {
      dispatch(clearState());
    },
    [dispatch],
  );

  return (
    <Card variant="outlined" sx={{ maxWidth: 150 }}>
      <CardContent>
        <Box
          component="img"
          sx={{
            height: 150,
            width: 100,
          }}
          alt="item image"
          src={imageSrc.image}
        />
        <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
          {name}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {price} G
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => buy()}>Buy</Button>
      </CardActions>
      <Typography>{itemStatus === CharacterStatus.Finished && "Achat réussi."}</Typography>
      <Typography>{itemErrorMessage}</Typography>
    </Card>
  );
}
