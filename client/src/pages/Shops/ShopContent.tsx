import { Container, Grid } from "@mui/material";
import Product from "components/Product/Product";
import { IProduct } from "models/products/products";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productService from "services/product.service";

export default function ShopContent() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const { shopId, categoryId } = useParams();

  useEffect(() => {
    async function getProductsByShop() {
      if (!shopId || !categoryId) return;
      const productsFetched = await productService.getProductsByCategory(shopId, categoryId);
      setProducts(productsFetched);
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getProductsByShop();
  }, [categoryId, shopId]);

  return (
    <Container component="main">
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item key={product._id}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
