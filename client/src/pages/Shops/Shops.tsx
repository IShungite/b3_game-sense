import { Container, Grid } from "@mui/material";
import Shop from "components/Shop/Shop";
import { RouteUrls } from "config";
import { useAppSelector } from "hooks";
import { IShop } from "models/shops/shop";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import shopService from "services/shop.service";

export default function Shops() {
  const [shops, setShops] = useState<IShop[]>([]);
  const { currentCharacter } = useAppSelector((state) => state.character);

  useEffect(() => {
    async function getShops() {
      const shopsFetched = await shopService.getShops();
      setShops(shopsFetched);
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getShops();
  }, []);

  if (!currentCharacter) {
    return <Navigate to={RouteUrls.SelectCharacter} />;
  }

  return (
    <Container component="main">
      <Grid container spacing={3}>
        {shops.map((shop) => (
          <Grid item key={shop._id}>
            <Shop shop={shop} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
