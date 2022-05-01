import { Box, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useAppSelector } from "hooks";
import { CreateInventoryDto } from "models/inventory/create-inventory.dto";
import React from "react";
import inventoryService from "services/inventory.service";
import getItemImage from "utils/items";

type Props = { name: string; id: string; itemId: string; price: number; description: string };

export default function Product({ name, id, itemId, price, description }: Props) {
  const imageSrc = getItemImage(itemId);
  const { currentCharacter } = useAppSelector((state) => state.character);

  const data: CreateInventoryDto = {
    productId: id,
    characterId: "",
  };

  async function buy() {
    // eslint-disable-next-line no-alert
    await inventoryService.buyProduct(data);
  }

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
    </Card>
  );
}
