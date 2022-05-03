import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "hooks";
import { IProduct } from "models/products/products";
import React from "react";
import { buyProduct } from "reducers/characterSlice";
import getItemImage from "utils/items";

export default function Product({ product }: { product: IProduct }) {
  const imageSrc = getItemImage(product.itemId);
  const dispatch = useAppDispatch();
  const { currentCharacter } = useAppSelector((state) => state.character);

  const data = {
    characterId: currentCharacter?._id ?? "",
    productId: product._id,
  };

  function buy() {
    if (!currentCharacter) return;

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(buyProduct(data));
  }

  return (
    <Card variant="outlined" sx={{ maxWidth: 150 }}>
      <CardContent>
        <img
          style={{
            width: 100,
          }}
          alt="product"
          src={`${imageSrc.image}`}
        />
        <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
          {product.name}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {product.price} G
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {product.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" onClick={() => buy()}>
          Buy
        </Button>
      </CardActions>
    </Card>
  );
}
