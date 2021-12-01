import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { auth, sendPasswordResetEmail } from "../../configs/firebase";
import "./resetPassword.css";
function ResetPassword() {
  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const [user, loading] = useAuthState(auth);
  const history = useHistory();

  const sendEmail = (email) => {
    sendPasswordResetEmail(email);
    setShowAlert(true);
  };

  useEffect(() => {
    if (loading) return;
    if (user) history.replace("/");
  }, [user, loading, history]);
  return (
    <div className="reset">
      <div className="reset__container">
        <input
          type="text"
          className="reset__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <button className="reset__btn" onClick={() => sendEmail(email)}>
          Send password reset email
        </button>
        <div>
          Don't have an account?{" "}
          <Button component={Link} to="/login">
            <Typography color="secondary">Register now</Typography>
          </Button>
        </div>
      </div>
      {showAlert && (
        <>
          <Typography sx={{color: '#4caf50'}}>
            We have sent the reset link in the provided email. Please follow the
            instructions in the email to complete the passwork reset process
          </Typography>
          <Typography >
            If the email was not recieved please check the spam or junk folder
            and also please verify whether the provided email is the one used to
            register with us.
          </Typography>
        </>
      )}
    </div>
  );
}
export default ResetPassword;
