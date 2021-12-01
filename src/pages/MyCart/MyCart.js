import { Button, Container, Modal, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { bottomStandard } from "configs/toastConfigs";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deleteRequest, postRequest } from "tools/apiHelper";
import { useFetch } from "use-http";
import EmptyData from "utils/shared/EmptyData";
import MyCartBook from "./MyCartBook";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import PaymentForm from "utils/Payment/PaymentForm";
import PageLoading from "utils/shared/PageLoading";

export default function MyCart() {
  const [isBookPurchased, setIsBookPurchased] = useState(false);
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const { loading, error, data } = useFetch("cart/getcart",{cachePolicy:'no-cache'},[isBookPurchased]);
  const [cartedBooks, setCartedBooks] = useState([]);

  const handleCartRemove = async (index) => {
    const response = await deleteRequest("cart/removefromcart", {
      isbn: [cartedBooks[index].isbn],

    });
    if (response.status === 200) {
      let cart = [...cartedBooks];
      cart.splice(index, 1);
      setCartedBooks(cart);
    }
  };
  useEffect(() => {
    setCartedBooks(data?.data || []);
  }, [data]);
  const prices = cartedBooks?.map((book) => book.price);
  const isbns = cartedBooks?.map((book) => book.isbn);
  const handlePurchaseModalClose = () => {
    setPurchaseModalOpen(false);
  };

  const handlePurchaseModelSubmit = (cardDetails) => {
    postRequest("sales/purchase", { isbnList: isbns }).then((result) => {
      if (result.status === 200) {
        setPurchaseModalOpen(false);
        setIsBookPurchased(true);
        toast("Book Purchased Sucessfully", bottomStandard);

      } else {
        toast("Unable to Purchase the Book", bottomStandard);
      }
    }).catch(e => {
      console.log(e)
      toast("Unable to Purchase the Book", bottomStandard);
    });

  };
  const handlePurchaseModalOpen = () => {
    setPurchaseModalOpen(true);
  };
  if (loading)
    return <PageLoading displayMsg="Loading you Cart..." />
  if (error) {
    toast(error.message, bottomStandard)
    // history.push('/login')
    return <EmptyData emptyText={error.message} />
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "column",
        flexGrow: 1,
        justifyContent: "flex-start",
      }}
    >
      <Container fixed maxWidth="lg">
        <Stack isBookPurchased={isBookPurchased} direction="column" mt={2} gap={2}>
          {cartedBooks &&
            cartedBooks?.map((book, index) => (
              <MyCartBook
                key={book.isbn}
                bookDetails={book}
                index={index}
                handleCartRemove={handleCartRemove}
              />
            ))}
        </Stack>
        {!loading && cartedBooks?.length === 0 && (
          <EmptyData emptyText="Cart is Empty" />
        )}
        {!loading && cartedBooks?.length !== 0 && (
          <Box mt={2}>
            <Stack alignItems="flex-end">
              <Typography variant="h4">Total Price</Typography>
              <Typography variant="body1">
                $ {prices.reduce((oldPrice, price) => oldPrice + price).toFixed(2)}
              </Typography>
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
            </Stack>
          </Box>
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
      </Container>
    </Box>
  );
}
