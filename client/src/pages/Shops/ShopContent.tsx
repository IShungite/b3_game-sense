import { Container, Grid } from "@mui/material";
import Product from "components/Product/Product";
import { useAppDispatch, useAppSelector } from "hooks";
import { IProduct } from "models/products/products";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CharacterStatus, clearState } from "reducers/characterSlice";
import productService from "services/product.service";

export default function ShopContent() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const { shopId, categoryId } = useParams();
  const dispatch = useAppDispatch();

  const { itemErrorMessage, itemStatus } = useAppSelector((state) => state.character);

  useEffect(() => {
    async function getProductsByShop() {
      if (!shopId || !categoryId) return;
      const productsFetched = await productService.getProductsByCategory(shopId, categoryId);
      setProducts(productsFetched);
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getProductsByShop();
  }, [categoryId, shopId]);

  useEffect(() => {
    if (itemStatus === CharacterStatus.Finished) {
      alert("Achat effectué");
      dispatch(clearState());
    } else if (itemStatus === CharacterStatus.Error) {
      alert(itemErrorMessage);
    }
  }, [dispatch, itemErrorMessage, itemStatus]);

  useEffect(
    () => () => {
      dispatch(clearState());
    },
    [dispatch],
  );

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
