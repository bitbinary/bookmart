import {
  Button,
  FormControl,
  FormGroup,
  Input,
  InputLabel,
  Paper,
  Stack,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Cards from "react-credit-cards";

const paymentDetailsItems = [
  {
    name: "number",
    type: "numberic",
    label: "Card Number",
    placeholder: "Card Number",
  },
  {
    name: "name",
    type: "text",
    label: "Card Holder Name",
    placeholder: "Card Holder Name",
  },
  {
    name: "cvv",
    type: "password",
    label: "CVV",
    placeholder: "CVV",
  },
  {
    name: "expiry",
    type: "numeric",
    label: "Card Expiry",
    placeholder: "Card Expiry",
  },
];
const regExNumbers = /^\d+$/;
export default class PaymentForm extends React.Component {
  state = {
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  };
  handlePaymentCancel = () => {
    this.props.formCancel();
  };
  handlePaymentSubmit = (submitData) => {
    this.props.formSubmit(submitData);
  };
  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "cvv") {
      if (value.length > 3) return;
      if (!regExNumbers.test(value) && value !== "") return;
    }
    if (name === "number") {
      if (value.length > 16) return;
      if (!regExNumbers.test(value) && value !== "") return;
    }
    if (name === "expiry") {
      if (value.length > 4) return;
      if (!regExNumbers.test(value) && value !== "") return;
    }
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Box
        component={Paper}
        p={2}
        sx={{
          borderRadius: "16px",
        }}
        id="PaymentForm"
      >
        <Cards
          cvc={this.state.cvc}
          expiry={this.state.expiry}
          focused={this.state.focus}
          name={this.state.name}
          number={this.state.number}
        />

        <FormGroup
          sx={{
            marginTop: "32px",
            gap: "10px",
            display: "flex",
            flexFlow: "column",
            padding: "8px",
          }}
        >
          {paymentDetailsItems.map((paymentDetail) => (
            <FormControl key={paymentDetail.name}>
              <InputLabel htmlFor="component-outlined">
                {paymentDetail.label}
              </InputLabel>
              <Input
                sx={{
                  padding: "1px",
                }}
                id="component-outlined"
                type={paymentDetail.type}
                name={paymentDetail.name}
                value={this.state[paymentDetail.name]}
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
                label={paymentDetail.label}
              />
            </FormControl>
          ))}
        </FormGroup>
        <Stack direction="row" justifyContent="space-between">
          <Button onClick={this.handlePaymentCancel} color="warning">
            Cancel
          </Button>
          <Button
            onClick={() => this.handlePaymentSubmit(this.state)}
            variant="contained"
          >
            Confirm
          </Button>
        </Stack>
      </Box>
    );
  }
}
