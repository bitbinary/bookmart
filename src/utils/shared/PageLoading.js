import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import bookMart from "../../assets/bookMart.gif";
export default function PageLoading(props) {
  const { displayMsg } = props;
  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        flexShrink: 0,
        flexFlow: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Stack direction="column" alighItems="center" gap={3}>
        <Typography variant="h6"> Where Stories Never Runs Out </Typography>
        <img src={bookMart} alt="Book mart" />
        <Typography textAlign="center" variant="h4"> Book Mart </Typography>

        {displayMsg && <Typography textAlign="center" variant="caption">{displayMsg}</Typography>}
      </Stack>
    </Box>
  );
}
