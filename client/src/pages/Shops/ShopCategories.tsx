import { Container, Grid } from "@mui/material";
import Category from "components/Category/Category";
import { ICategory } from "models/category/category";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import categoryService from "services/category.service";

export default function ShopCategories() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const { shopId } = useParams();

  useEffect(() => {
    async function fetchData() {
      if (!shopId) return;

      const categoriesFetched = await categoryService.getCategoriesByShop(shopId);
      setCategories(categoriesFetched);
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchData();
  }, [shopId]);

  return (
    <Container component="main">
      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid item key={category._id}>
            <Category name={category.name} id={category._id} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
