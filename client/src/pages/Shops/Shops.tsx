import { Container, Grid } from "@mui/material";
import Shop from "components/Shop/Shop";
import { IShop } from "models/shops/shop";
import React, { useEffect, useState } from "react";
import shopService from "services/shop.service";

export default function Shops() {

  const [shops, setShops] = useState<IShop[]>([]);

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
      {shops.map((shop) => <Grid item key={shop._id}><Shop name={shop.name} id={shop._id} /></Grid>)}        
      </Grid>

    </Container>
  );
}
