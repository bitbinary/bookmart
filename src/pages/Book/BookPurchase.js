import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { styled } from '@mui/system';
import { Paper } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import VisibilityIcon from '@mui/icons-material/Visibility';
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
export default function BookPurchase({
  isPurchased,
  isCarted,
  price,
  currency = 'AUD',
  currencySymbol = '$',
}) {
  return (
    <Grid item xs={12} sm={12} md={12}>
      <Typography variant="h6" display="block" gutterBottom>
        Price: {currencySymbol} {price}
      </Typography>
      {!isPurchased && (
        <>
          <Button
            variant="contained"
            color="primary"
            sx={{
              margin: 1,
              display: 'inline-flex',
              justifyContent: 'center',
              alighItems: 'center',
            }}
            startIcon={<ShoppingBasketIcon />}
          >
            BUY
          </Button>
          <Button
            variant={isCarted ? 'contained' : 'outlined'}
            sx={{ mt: 1, ml: 1, mb: 1 }}
            color={isCarted ? 'success' : 'info'}
            startIcon={<ShoppingCartIcon />}
          >
            {isCarted ? 'CART' : 'CART'}
          </Button>
        </>
      )}
      {isPurchased && (
        <>
          <Button
            variant="contained"
            color="primary"
            sx={{
              margin: 1,
              display: 'inline-flex',
              justifyContent: 'center',
              alighItems: 'center',
            }}
            startIcon={<VisibilityIcon />}
          >
            Read Book
          </Button>
        </>
      )}
    </Grid>
  );
}
