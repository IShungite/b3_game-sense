import { Container, Grid } from "@mui/material";
import Product from "components/Product/Product";
import { IProduct } from "models/products/products";
import React, { useEffect, useState } from "react";
import productService from "services/product.service";

export default function ShopDetails() {

  const [products, setProducts] = useState<IProduct[]>([]);

  const getProducts = async() => {
    const productsFetched = await productService.getProducts();
    setProducts(productsFetched);
  }

  useEffect( () => {
    async function fetchData() {
      await getProducts();
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchData();
  }, []);

  return (
    <Container component="main">
      <Grid container spacing={3}>
      {products.map((product) => <Grid item key={product._id}><Product name={product.name} id={product._id} price={product.price} description={product.description} /></Grid>)}        
      </Grid>

    </Container>
  );
}