import { Button, FormControl, FormHelperText, Grid, Input, InputLabel } from "@mui/material";
import React, { useState } from "react";
import { registerWithEmailAndPassword } from "../../configs/firebase";
import "./register.css";
export default function RegisterBox() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const [name, setName] = useState("");
  const register = () => {
    if (!name) setShowAlert("Please enter name");
    else if (password !== confirmPassword)
      setShowAlert("Passwords don't match");
    else if (!email) setShowAlert("Please enter email");
    else if (!password) setShowAlert("Please enter password");
    else registerWithEmailAndPassword(name, email, password, confirmPassword);
  };
  return (
    <Grid container flexDirection="column" gap={2}>
      {showAlert && (
        <div style={{ color: "red", textAlign: "center" }}>*{showAlert}</div>
      )}
      <FormControl variant="standard">
        <InputLabel htmlFor="component-name">Full Name*</InputLabel>
        <Input
          id="component-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-describedby="component-name-text"
        />
      </FormControl>
      <FormControl variant="standard">
        <InputLabel htmlFor="component-email">Email*</InputLabel>
        <Input
          id="component-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-describedby="component-email-text"
        />
      </FormControl>
      <FormControl variant="standard">
        <InputLabel htmlFor="component-password">Password*</InputLabel>
        <Input
          id="component-password"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          aria-describedby="component-password-text"
        />
         <FormHelperText id="component-Password-text">
         min 6 characters
        </FormHelperText>
      </FormControl>
      <FormControl variant="standard">
        <InputLabel htmlFor="component-confirmPassword">Confirm Password*</InputLabel>
        <Input
          id="component-confirmPassword"
          value={confirmPassword}
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          aria-describedby="component-confirmPassword-text"
        />
         <FormHelperText id="component-Password-text">
         min 6 characters
        </FormHelperText>
      </FormControl>
      <Button
        variant="contained"
        onClick={register}
      >
        Register 
      </Button>
     
    </Grid>
  );
}
