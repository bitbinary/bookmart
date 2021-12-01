import {
  Button,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { Box } from "@mui/system";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PaymentForm from "utils/Payment/PaymentForm";
import { deleteRequest, postRequest } from "tools/apiHelper";
import { toast } from "react-toastify";
import { bottomStandard } from "configs/toastConfigs";
import { Link, useHistory } from "react-router-dom";
import { getAuth } from "@firebase/auth";
export default function BookPurchase({
  isAuthenticated = false,
  isPurchased = false,
  isCarted = false,
  price,
  currency = "AUD",
  currencySymbol = "$",
  isbn,
}) {
  const [isBookPurchased, setIsBookPurchased] = useState(isPurchased && isAuthenticated);
  const [isBookCarted, setIsBookCarted] = useState(isCarted);
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const user = getAuth()
  const userRef = useRef(user)
  const history= useHistory()
  const handlePurchaseModalClose = () => {
    setPurchaseModalOpen(false);
  };
  const handleBookCarting = async () => {
    if(!userRef.current.currentUser){
      toast.info("Please Login/Register to add book to cart", bottomStandard)
      history.push('/login',{
        fromLocation: history.location 
      })
      return null
    }
    if (!isBookCarted) {
      const response = await postRequest("cart/addtocart", {
        ISBN: isbn,
      });
      if (response.status === 200) {
        setIsBookCarted(true);
      }
    } else {
      const response = await deleteRequest("cart/removefromcart", {
        isbn: [isbn],
      });
      if (response.status === 200) {
        setIsBookCarted(false);
      }
    }
  };
  const handlePurchaseModelSubmit = (cardDetails) => {
    postRequest("sales/purchase", { isbnList: [isbn] }).then((result) => {
      if (result.status === 200) {
        toast("Book Purchased Sucessfully", bottomStandard);
        setPurchaseModalOpen(false);
        setIsBookPurchased(true);
      } else {
        toast("Unable to Purchase the Book", bottomStandard);
      }
    });

  };
  const handlePurchaseModalOpen = () => {
    if(!userRef.current.currentUser){
      toast.info("Please Login/Register to Buy book", bottomStandard)
      history.push('/login',{
        fromLocation: history.location 
      })
      return null
    }
    setPurchaseModalOpen(true);
  };

  return (
    <Grid item xs={12} sm={12} md={12}>
      <Typography variant="h6" display="block" gutterBottom>
        Price: {new Intl.NumberFormat('en-AU', {
               style: 'currency',
               currency: 'AUD',
            }).format(price)}
      </Typography>
      {!isBookPurchased && (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePurchaseModalOpen}
            sx={{
              margin: 1,
              display: "inline-flex",
              justifyContent: "center",
              alighItems: "center",
            }}
            startIcon={<ShoppingBasketIcon />}
          >
            BUY
          </Button>
          <Button
            variant={isBookCarted ? "contained" : "outlined"}
            sx={{ mt: 1, ml: 1, mb: 1 }}
            color={isBookCarted ? "success" : "info"}
            startIcon={<ShoppingCartIcon />}
            onClick={handleBookCarting}
          >
            {!isBookCarted ? "CART" : "CARTED"}
          </Button>
        </>
      )}
      {isBookPurchased && (
        <>
          <Button
            component={Link}
            to={`/readbook/${isbn}`}
            size='large'
            aria-label='Read Book'
            variant="contained"
            color="primary"
            sx={{
              margin: 1,
              display: "inline-flex",
              justifyContent: "center",
              alighItems: "center",
            }}
            startIcon={<VisibilityIcon />}
          >
            Read Book
          </Button>
        </>
      )}
      <Modal
        sx={{
          display: "grid",
          placeContent: "center",
        }}
        open={purchaseModalOpen}
        onClose={handlePurchaseModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="div">
          <PaymentForm
            formCancel={handlePurchaseModalClose}
            formSubmit={handlePurchaseModelSubmit}
          />
        </Box>
      </Modal>
    </Grid>
  );
}
