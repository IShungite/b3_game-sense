import { Container, Grid } from "@mui/material";
import Product from "components/Product/Product";
import { IProduct } from "models/products/products";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productService from "services/product.service";

export default function ShopContent() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const { shopId, categoryId } = useParams();

  const getProductsByShop = async () => {
    if (!shopId || !categoryId) return;
    const productsFetched = await productService.getProductsByCategory(categoryId);
    setProducts(productsFetched);
  };

  useEffect(() => {
    async function fetchData() {
      await getProductsByShop();
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container component="main">
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item key={product._id}>
            <Product
              name={product.name}
              id={product._id}
              itemId={product.itemId}
              price={product.price}
              description={product.description}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
