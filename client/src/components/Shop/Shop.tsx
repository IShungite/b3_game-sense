import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { IShop } from 'models/shops/shop';

type Props = {shop:IShop}

export default function Shop({shop}:Props) {

  return (
    <Card variant="outlined" sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {shop.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`${shop._id}`}>Entrer</Link>
      </CardActions>
    </Card>
  );
}