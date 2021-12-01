import { Button, FormControl, FormHelperText, Grid, Input, InputLabel } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "../../configs/firebase";
import "./login.css";

export default function LoginBox() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Box>
      <Grid container flexDirection="column" gap={2}>
    <FormControl variant="standard">
        <InputLabel htmlFor="component-Email">Email*</InputLabel>
        <Input
          id="component-Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-describedby="component-Email-text"
        />
       
      </FormControl>

      <FormControl variant="standard">
        <InputLabel htmlFor="component-Password">Password*</InputLabel>
        <Input
          id="component-Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-describedby="component-Password-text"
        />
       
      </FormControl>
      <Button
        variant="contained"
        onClick={() => signInWithEmailAndPassword(email, password)}
      >
        Login 
      </Button>
    </Grid>
    </Box>
  );
}
