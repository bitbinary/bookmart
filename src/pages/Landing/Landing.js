import React, { useEffect } from "react";
import { Box } from "@mui/system";
import RecentlyViewed from "./RecentlyViewed";
import BestSellers from "./BestSellers";
import RecommendedBooks from "./RecommendedBooks";
import AllBooks from "./AllBooks";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../configs/firebase";
import Stack from "@mui/material/Stack";
import { useHistory } from "react-router";
export default function Landing() {
  const [user] = useAuthState(auth);
  const history = useHistory();
  useEffect(() => {
    if (user) {
      const fromLocation = history?.location?.state?.fromLocation;
      if (fromLocation?.pathname) {
        history.push(fromLocation.pathname);
      }
    }
  }, [user]);
  return (
    <Box
      p={2}
      sx={{
        display: "flex",
        flexFlow: "column",
        flexGrow: 1,
        justifyContent: "flex-start",
      }}
    >
      <Stack spacing={4} mb={5} mt={5}>
        {user && <RecentlyViewed />}
        <BestSellers />
        {user && <RecommendedBooks />}
        <AllBooks />
      </Stack>
    </Box>
  );
}
