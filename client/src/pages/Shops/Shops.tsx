import { Container, Grid } from "@mui/material";
import Shop from "components/Shop/Shop";
import { IShop } from "models/shops/shop";
import React, { useEffect, useState } from "react";
import shopService from "services/shop.service";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "hooks";
import { RouteUrls } from "config";

export default function Shops() {

  const [shops, setShops] = useState<IShop[]>([]);
  const { currentCharacter } = useAppSelector((state) => state.character);

  if (!currentCharacter) {
    return <Navigate to={RouteUrls.SelectCharacter} />;
  }

  const getShops = async() => {
    const shopsFetched = await shopService.getShops();
    setShops(shopsFetched);
  }

  useEffect( () => {
    async function fetchData() {
      await getShops();
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchData();
  }, []);

  return (
    <Container component="main">
      <Grid container spacing={3}>
      {shops.map((shop) => <Grid item key={shop._id}><Shop shop={shop} /></Grid>)}        
      </Grid>

    </Container>
  );
}
