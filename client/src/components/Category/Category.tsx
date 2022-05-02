import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

type Props = {name:string, id:string}

export default function Category({name, id}:Props) {

  return (
    <Card variant="outlined" sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
          {name}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`${id}`}>Entrer</Link>
      </CardActions>
    </Card>
  );
}