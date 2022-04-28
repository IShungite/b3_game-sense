import { Button, Grid, Typography } from "@mui/material";
import { RouteUrls } from "config";
import { useAppDispatch, useAppSelector } from "hooks";
import { IPromotion } from "models/promotions/promotion";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPromotions, setCurrentPromotion } from "reducers/promotionSlice";

export default function PromotionsGrid() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { promotions, errorMessage } = useAppSelector((state) => state.promotion);
  const { currentSchool } = useAppSelector((state) => state.school);

  const handleClickPromotion = (promotion: IPromotion) => {
    dispatch(setCurrentPromotion(promotion));
    navigate(RouteUrls.Promotion);
  };

  useEffect(() => {
    if (promotions.length === 0 && currentSchool) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      dispatch(getPromotions(currentSchool._id));
    }
  }, [dispatch, promotions.length, currentSchool]);

  return (
    <>
      <Typography variant="h5">Liste des classes</Typography>
      <Typography>{errorMessage}</Typography>

      <Grid container direction="column">
        {promotions.map((promotion) => (
          <Grid item key={promotion._id}>
            <Button
              onClick={() => {
                handleClickPromotion(promotion);
              }}
            >
              {promotion.name}
            </Button>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
